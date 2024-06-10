import Store from "./store/Store";
import Dispatcher from "./store/Dispatcher";
import "./styles.css";
import {createField} from "./components/field";
import {mapReducer} from "./store/reducers/coordReducer";

const initialState = {
    position: {
        x: 0,
        y: 0,
    },
    fieldMap: [],
    openedCells: [],
}

const store = new Store(mapReducer, initialState);
Dispatcher.subscribe(store.doAction);

function render(currentState) {
    const coordLabel = document.querySelector(".coord-label");
    coordLabel.innerText = `X: ${currentState.position.x}, Y: ${currentState.position.y}`;
}

store.subscribe('position_label', render);

createField(500, 500, 15000);

export default store;

