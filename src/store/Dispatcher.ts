import { IAction, ICallback } from './types/types';

class Dispatcher {
	storesCallbacks: ICallback[] = [];

	subscribe = (callback: ICallback)=> {
		this.storesCallbacks.push(callback);
	};

	dispatch = (action: IAction) => {
		this.storesCallbacks.forEach(callback => {
			callback(action);
		});
	};
}

export default new Dispatcher();