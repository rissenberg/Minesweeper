import {COLOR_BOMB, COLOR_MARKED} from "../../config";
import store from "../../index";
import "./style.css";


export const Navbar = () => {
    const coordLabel = document.getElementById("coord-label");
    const minesLabel = document.getElementById("mines-label");
    const leftLabel = document.getElementById("left-label");
    const statusLabel = document.getElementById("status-label");

    function render(currentState) {
        coordLabel.innerText = `Position: (${currentState.position.x}, ${currentState.position.y})`;
        minesLabel.innerText = `Mines: ${currentState.mines}`;
        leftLabel.innerText = `Left: ${currentState.leftClosed}`;

        if (currentState.gameOver) {
            statusLabel.innerText = `Game Over`;
            statusLabel.style.color = COLOR_BOMB;
        }
        if (currentState.gameWon) {
            statusLabel.innerText = `You've Won!`;
            statusLabel.style.color = COLOR_MARKED;
        }
    }

    store.subscribe('navbar', render);
}