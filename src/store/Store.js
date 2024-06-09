const DEFAULT_STATE = {};

class Store {
    subscribers = [];

    constructor(reducer, initialState = DEFAULT_STATE) {
        this.currentState = initialState;
        this.reducer = reducer;
    }

    getState = () => {
        return this.currentState
    }

    subscribe = (render) => {
        this.subscribers.push(render);
        render(this.currentState);
    }

    doAction = (action) => {
        this.currentState = this.reducer(this.currentState, action);
        this.subscribers.forEach(render => render(this.currentState));
    }
}

export default Store;