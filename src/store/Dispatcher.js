class Dispatcher {
    storesCallbacks = [];

    subscribe = (callback)=> {
        this.storesCallbacks.push(callback);
    }

    dispatch = (action) => {
        this.storesCallbacks.forEach(callback => {
            callback(action);
        });
    }
}

export default new Dispatcher();