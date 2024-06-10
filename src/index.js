import Store from "./store/Store";
import Dispatcher from "./store/Dispatcher";
import "./styles.css";
import {createField} from "./components/field";
import {gameReducer} from "./store/reducers/gameReducer";
import {COLOR_FLAG, COLOR_MARKED} from "./constants";

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
    gameWon: false,
    fieldMap: [],
    openedCells: [],
}

const store = new Store(gameReducer, initialState);
Dispatcher.subscribe(store.doAction);

function render(currentState) {
    const coordLabel = document.getElementById("coord-label");
    coordLabel.innerText = `Position: (${currentState.position.x}, ${currentState.position.y})`;
    const minesLabel = document.getElementById("mines-label");
    minesLabel.innerText = `Mines: ${currentState.mines}`;
    const leftLabel = document.getElementById("left-label");
    leftLabel.innerText = `Left: ${currentState.leftClosed}`;
    const statusLabel = document.getElementById("status-label");
    if (currentState.gameOver) {
        statusLabel.innerText = `Game Over`;
        statusLabel.style.color = COLOR_FLAG;
    }
    if (currentState.gameWon) {
        statusLabel.innerText = `You've Won!`;
        statusLabel.style.color = COLOR_MARKED;
    }
}

store.subscribe('position_label', render);

createField(10, 10, 4);

export default store;

