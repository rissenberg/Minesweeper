const DEFAULT_STATE = {};

class Store {
    subscribers = new Map();

    constructor(reducer, initialState = DEFAULT_STATE) {
        this.currentState = initialState;
        this.reducer = reducer;
    }

    getState = () => {
        return this.currentState
    }

    subscribe = (component, render) => {
        this.subscribers.set(component, render);
        render(this.currentState);
    }

    doAction = (action) => {
        this.currentState = this.reducer(this.currentState, action);
        Array.from(this.subscribers.values()).forEach(render => render(this.currentState));
    }
}

export default Store;