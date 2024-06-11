import { IAction, ICallback } from './types/types';

//
// Диспетчер Flux. Принимает все action в приложении и пересылает на все store
//
class Dispatcher {
	storesCallbacks: ICallback[] = [];

	// Подписка. Так диспетчер узнает о хранилищах
	subscribe = (callback: ICallback)=> {
		this.storesCallbacks.push(callback);
	};

	// Обработка поступившего action
	dispatch = (action: IAction) => {
		this.storesCallbacks.forEach(callback => {
			callback(action);
		});
	};
}

export default new Dispatcher();		// Синглтон!