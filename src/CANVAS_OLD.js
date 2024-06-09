// import Dispatcher from "./store/Dispatcher";
// import {setCoord} from "./store/actions/coordActions";
//
// const CELL_SIZE = 30;
//
// export const createField = (R, C) => {
//     const { dispatch } = Dispatcher;
//
//     const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");
//
//     const FILED_WIDTH = R || 10;
//     const FILED_HEIGHT = C || 10;
//
//     canvas.width = FILED_WIDTH * CELL_SIZE;
//     canvas.height = FILED_HEIGHT * CELL_SIZE;
//
//     ctx.fillStyle = "#dadada";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//     ctx.strokeStyle = "#272727";
//     for (let x = 0; x <= FILED_WIDTH; x++) {
//         ctx.beginPath();
//         ctx.moveTo(x * CELL_SIZE, 0);
//         ctx.lineTo(x * CELL_SIZE, canvas.height);
//         ctx.stroke();
//     }
//     for (let y = 0; y <= FILED_HEIGHT; y++) {
//         ctx.beginPath();
//         ctx.moveTo(0, y * CELL_SIZE);
//         ctx.lineTo(canvas.width, y * CELL_SIZE);
//         ctx.stroke();
//     }
//
//     canvas.addEventListener("click", (e) => {
//         const x = e.layerX - canvas.offsetLeft;
//         const y = e.layerY - canvas.offsetTop;
//
//         const coord_X = Math.floor(x / CELL_SIZE);
//         const coord_Y = Math.floor(y / CELL_SIZE);
//
//         ctx.fillStyle = "#e65151";
//         ctx.fillRect(coord_X * CELL_SIZE, coord_Y * CELL_SIZE,
//             CELL_SIZE, CELL_SIZE);
//
//         dispatch(setCoord(coord_X, coord_Y));
//     });
//
// }