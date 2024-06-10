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
        // TODO TEMP
        const startTime = performance.now();
        const newState = this.reducer(this.currentState, action);
        const endTime = performance.now();
        console.log(`Время выполнения: ${endTime - startTime} мс`);

        if (this.currentState !== newState) {
            this.currentState = newState;
            Array.from(this.subscribers.values()).forEach(render => render(this.currentState));
        }
    }
}

export default Store;