import { IAction, ICallback, IReducer } from './types/types';

class Store<T> {
	subscribers = new Map();
	currentState: T;
	reducer: IReducer<T>;

	constructor(reducer: IReducer<T>, initialState: T) {
		this.currentState = initialState;
		this.reducer = reducer;
	}

	getState = () => {
		return this.currentState;
	};

	subscribe = (component: string, render: ICallback) => {
		this.subscribers.set(component, render);
		render(this.currentState);
	};

	doAction = (action: IAction) => {
		const newState = this.reducer(this.currentState, action);
		if (this.currentState !== newState) {
			this.currentState = newState;
			Array.from(this.subscribers.values()).forEach(render => render(this.currentState));
		}
	};
}

export default Store;