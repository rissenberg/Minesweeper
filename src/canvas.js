import Dispatcher from "./store/Dispatcher";
import {setCoord} from "./store/actions/coordActions";
import {createWebGLProgram} from "./WebGL";

const CELL_SIZE = 30;

const COLOR_BLACK = [0.0, 0.0, 0.0];
const COLOR_BACKGROUND = [0.85, 0.85, 0.8, 1.0];

export const createField = (R, C) => {
    const { dispatch } = Dispatcher;

    const FIELD_WIDTH = R || 10;
    const FIELD_HEIGHT = C || 10;

    const canvas = document.getElementById("canvas");

    canvas.width = FIELD_WIDTH * CELL_SIZE;
    canvas.height = FIELD_HEIGHT * CELL_SIZE;

    const gl = canvas.getContext("webgl") || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    gl.clearColor(...COLOR_BACKGROUND);

    const program = createWebGLProgram(gl);

    // Create grid lines buffer
    const linesVertices = [];

    for (let x = 0; x <= FIELD_WIDTH; x++) {
        const normalX = x * 2 / (FIELD_WIDTH) - 1;

        linesVertices.push(normalX, -1.0, ...COLOR_BLACK);
        linesVertices.push(normalX,  1.0, ...COLOR_BLACK);
    }
    for (let y = 0; y <= FIELD_HEIGHT; y++) {
        const normalY = y * 2 / (FIELD_HEIGHT) - 1;

        linesVertices.push(-1.0, normalY, ...COLOR_BLACK);
        linesVertices.push( 1.0, normalY, ...COLOR_BLACK);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linesVertices), gl.STATIC_DRAW);

    // Main render

    gl.useProgram(program);
    gl.drawArrays(gl.LINES, 0, linesVertices.length / 5);

    canvas.addEventListener("click", (e) => {
        const x = e.layerX - canvas.offsetLeft;
        const y = e.layerY - canvas.offsetTop;

        const coord_X = Math.floor(x / CELL_SIZE) > 0 ?
            Math.floor(x / CELL_SIZE) : 0;
        const coord_Y = Math.floor(y / CELL_SIZE) > 0 ?
            Math.floor(y / CELL_SIZE) : 0;

        const triangle = [
             0.0,  0.5,   1.0, 1.0, 0.0,
            -0.5, -0.5,   0.7, 0.0, 1.0,
             0.5, -0.5,   0.1, 1.0, 0.6
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        dispatch(setCoord(coord_X, coord_Y));
    });

}