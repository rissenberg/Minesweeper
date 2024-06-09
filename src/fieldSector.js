import {CELL_SIZE, DEFAULT_SECTOR_HEIGHT, DEFAULT_SECTOR_WIDTH} from "./constants";

const COLOR_CLOSED = "#dadada";
const COLOR_BORDER = "#272727";
const COLOR_FLAG = "#e65151";

export const createFieldSector = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("hidden");

    const ctx = canvas.getContext("2d");

    const FILED_WIDTH = width || DEFAULT_SECTOR_WIDTH;
    const FILED_HEIGHT = height || DEFAULT_SECTOR_HEIGHT;

    canvas.width = FILED_WIDTH * CELL_SIZE;
    canvas.height = FILED_HEIGHT * CELL_SIZE;

    ctx.fillStyle = COLOR_CLOSED;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = COLOR_BORDER;
    for (let x = 0; x <= FILED_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= FILED_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(canvas.width, y * CELL_SIZE);
        ctx.stroke();
    }

    return canvas;
}
