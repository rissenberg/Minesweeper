import { IAction, ICallback, IReducer } from './types/types';

//
// Объект хранилища Flux. Как и в классическом flux, хранилищ может быть множество, но в этом приложении оно одно
// Тем не менее, интерфейс позволяет создать их несколько
//
class Store<T> {
	subscribers = new Map(); // подписчики на изменения
	currentState: T;
	reducer: IReducer<T>;

	constructor(reducer: IReducer<T>, initialState: T) {
		this.currentState = initialState;
		this.reducer = reducer;
	}

	getState = () => {
		return this.currentState;
	};

	// Подписка. Принимает на вход уникальное название (обработчика или компонента), чтобы не записывать
	// один и тот же обработчик множество раз, и коллбек, который будет вызван.
	subscribe = (component: string, render: ICallback) => {
		this.subscribers.set(component, render);
		// render(this.currentState);
	};

	// При получении action от dispatcher, выполняет его в соответствии с reducer.
	doAction = (action: IAction) => {
		const newState = this.reducer(this.currentState, action);
		console.log(newState);
		if (this.currentState !== newState) {
			this.currentState = newState;
			Array.from(this.subscribers.values()).forEach(render => render(this.currentState));
		}
	};
}

export default Store;