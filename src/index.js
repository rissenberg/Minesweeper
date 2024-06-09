import Store from "./store/Store";
import Dispatcher from "./store/Dispatcher";
import "./styles.css";
import {createField} from "./canvas";
import {coordReducer} from "./store/reducers/counterReducer";

const initialState = {
    x: 0,
    y: 0,
}

const store = new Store(coordReducer, initialState);
Dispatcher.subscribe(store.doAction);

function render(currentState) {
    const coordLabel = document.querySelector(".coordLabel");
    coordLabel.innerText = `X: ${currentState.x}, Y: ${currentState.y}`;
}

store.subscribe(render);

createField(500, 500);
