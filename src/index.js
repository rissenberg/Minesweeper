import Store from "./store/Store";
import Dispatcher from "./store/Dispatcher";
import "./styles.css";
import {createField} from "./field";
import {coordReducer} from "./store/reducers/counterReducer";

const initialState = {
    x: 0,
    y: 0,
}

const store = new Store(coordReducer, initialState);
Dispatcher.subscribe(store.doAction);

function render(currentState) {
    const coordLabel = document.querySelector(".coord-label");
    coordLabel.innerText = `X: ${currentState.x}, Y: ${currentState.y}`;
}

store.subscribe(render);

createField(1000, 1000);

const canv1 = document.querySelector('canvas');
canv1.classList.remove('hidden');
