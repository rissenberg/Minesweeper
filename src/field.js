import Dispatcher from "./store/Dispatcher";
// import {setCoord} from "./store/actions/coordActions";
import {CELL_SIZE, DEFAULT_SECTOR_HEIGHT, DEFAULT_SECTOR_WIDTH} from "./constants";
import {createFieldSector} from "./fieldSector";


export const createField = (width, height) => {
    const { dispatch } = Dispatcher;

    const fieldContainer = document.getElementById("field-container");
    fieldContainer.style.width = `${width * CELL_SIZE}px`;


    for (let y = 0; y < height; y += DEFAULT_SECTOR_HEIGHT) {
        for (let x = 0; x < width; x += DEFAULT_SECTOR_WIDTH) {
            const sectorWidth = width - x < DEFAULT_SECTOR_WIDTH
                ? width - x
                : DEFAULT_SECTOR_WIDTH;
            const sectorHeight = height - y < DEFAULT_SECTOR_HEIGHT
                ? height - y
                : DEFAULT_SECTOR_HEIGHT;

            const sector = createFieldSector(sectorWidth, sectorHeight);
            sector.id = `sector-${x / DEFAULT_SECTOR_WIDTH}-${y / DEFAULT_SECTOR_HEIGHT}`;

            fieldContainer.appendChild(sector);
        }
    }

    // canvas.addEventListener("click", (e) => {
    //     const x = e.layerX - canvas.offsetLeft;
    //     const y = e.layerY - canvas.offsetTop;
    //
    //     const coord_X = Math.floor(x / CELL_SIZE);
    //     const coord_Y = Math.floor(y / CELL_SIZE);
    //
    //     ctx.fillStyle = "#e65151";
    //     ctx.fillRect(coord_X * CELL_SIZE + 1, coord_Y * CELL_SIZE + 1,
    //         CELL_SIZE - 2, CELL_SIZE - 2);
    //
    //     dispatch(setCoord(coord_X, coord_Y));
    // });

}