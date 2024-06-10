import {CELL_SIZE, COLOR_BORDER, COLOR_CLOSED, COLOR_FLAG, COLOR_OPENED, COLOR_WHITE, FONT_SIZE} from "../constants";
import Store from '../index';
import Dispatcher from "../store/Dispatcher";
import {openCell} from "../store/actions/coordActions";

const DEFAULT_SECTOR_WIDTH = 60;
const DEFAULT_SECTOR_HEIGHT = 40;

let prevEventListener;

export const createFieldSector = (x1, x2, y1, y2) => {
    const { dispatch } = Dispatcher;

    const canvas = document.getElementById("view-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.removeEventListener('click', prevEventListener);

    const FIELD_WIDTH = (x2 - x1) || DEFAULT_SECTOR_WIDTH;
    const FIELD_HEIGHT = (y2 - y1) || DEFAULT_SECTOR_HEIGHT;

    canvas.width = FIELD_WIDTH * CELL_SIZE;
    canvas.height = FIELD_HEIGHT * CELL_SIZE;

    ctx.fillStyle = COLOR_CLOSED;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = COLOR_BORDER;
    for (let x = 0; x <= FIELD_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= FIELD_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(canvas.width, y * CELL_SIZE);
        ctx.stroke();
    }

    const renderSelectedCells = (currentState) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                if (currentState.fieldMap[x][y]) {
                    ctx.fillStyle = COLOR_FLAG;
                    ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
                        CELL_SIZE - 2, CELL_SIZE - 2);
                }
                const openedCell = currentState.openedCells[x][y];
                if (openedCell !== null) {
                    ctx.fillStyle = COLOR_OPENED;
                    ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
                        CELL_SIZE - 2, CELL_SIZE - 2);
                    if (openedCell > 0) {
                        ctx.fillStyle = COLOR_WHITE;
                        ctx.font = `bold ${FONT_SIZE}px Arial`;
                        ctx.fillText(openedCell, (x - x1 + 0.3) * CELL_SIZE, (y - y1 + 0.7) * CELL_SIZE + 1);
                    }
                }
            }
        }
    }

    Store.subscribe('canvas', renderSelectedCells);

    const rect = canvas.getBoundingClientRect();
    function handleClickCell (e){
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const coord_X = Math.floor(x / CELL_SIZE) + x1;
        const coord_Y = Math.floor(y / CELL_SIZE) + y1;

        dispatch(openCell(coord_X, coord_Y));
    }
    canvas.addEventListener("click", handleClickCell);
    prevEventListener = handleClickCell;
}