import Store from "./store/Store";
import Dispatcher from "./store/Dispatcher";
import { counterReducer } from "./store/reducers/counterReducer";
import { incrementBy, decrementBy } from "./store/actions/counterActions";
import "./styles.css";

const initialState = {
    count: 0,
}

const store = new Store(counterReducer, initialState);
Dispatcher.subscribe(store.doAction);

const { dispatch } = Dispatcher;

function initEventListeners() {
    const incButton = document.querySelector("#btn-inc");
    const decButton = document.querySelector("#btn-dec");

    incButton.addEventListener("click", (e) => {
        e.preventDefault();
        dispatch(incrementBy(1));
    });

    decButton.addEventListener("click", (e) => {
        e.preventDefault();
        dispatch(decrementBy(1));
    });
}

function render(currentState) {
    const counterLabel = document.querySelector(".counter");
    counterLabel.innerHTML = currentState.count;
}

store.subscribe(render);

initEventListeners();
