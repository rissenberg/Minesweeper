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
    width: 0,
    height: 0,
    mines: 0,
    leftClosed: 0,
    gameOver: false,
    fieldMap: [],
    openedCells: [],
}

const store = new Store(mapReducer, initialState);
Dispatcher.subscribe(store.doAction);

function render(currentState) {
    const coordLabel = document.querySelector(".coord-label");
    coordLabel.innerText = `Position: (${currentState.position.x}, ${currentState.position.y})`;
    const minesLabel = document.querySelector(".mines-label");
    minesLabel.innerText = `Mines: ${currentState.mines}`;
    const leftLabel = document.querySelector(".left-label");
    leftLabel.innerText = `Left: ${currentState.leftClosed}`;
}

store.subscribe('position_label', render);

createField(50, 50, 250);

export default store;

