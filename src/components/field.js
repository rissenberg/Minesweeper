import Dispatcher from "../store/Dispatcher";
import {CELL_SIZE} from "../constants";
import {createFieldSector} from "./fieldSector";
import {throttle} from "../utils/throttle";
import {setPosition, initMap} from "../store/actions/coordActions";


export const createField = (width, height, mines) => {
    const { dispatch } = Dispatcher;

    const renderDelay = width * height > 500000 ? 50 : 25;

    dispatch(initMap(width, height, mines, { x: 0, y: 0 }));

    const fieldContainer = document.getElementById("field-container");
    fieldContainer.style.width = `${width * CELL_SIZE}px`;
    fieldContainer.style.height = `${height * CELL_SIZE}px`;

    let cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
    let cellNumY = Math.floor((window.innerHeight - 80) / CELL_SIZE);
    let windowScrollX = window.scrollX;
    let windowScrollY = window.scrollY;

    const renderView = () => {
        windowScrollX = window.scrollX;
        windowScrollY = window.scrollY;

        const x1 = Math.floor(windowScrollX / CELL_SIZE + 0.9);
        const y1 = Math.floor(windowScrollY / CELL_SIZE + 0.9);
        const x2 = x1 + cellNumX > width
                ? width
                : x1 + cellNumX;
        const y2 = y1 + cellNumY > height
            ? height
            : y1 + cellNumY;

        dispatch(setPosition(x1, y1));

        createFieldSector(x1, x2, y1, y2);
    }

    requestAnimationFrame(renderView);

    window.addEventListener("resize", throttle(() => {
        cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
        cellNumY = Math.floor((window.innerHeight - 70) / CELL_SIZE);

        requestAnimationFrame(renderView);
    }, renderDelay));

    window.addEventListener("scroll", throttle(() => {
        requestAnimationFrame(renderView);
    }, renderDelay));

}