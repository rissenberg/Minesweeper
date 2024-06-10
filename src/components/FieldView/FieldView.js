import {
	CELL_SIZE,
	FONT_SIZE,
	COLOR_BORDER,
	COLOR_CLOSED,
	COLOR_BOMB,
	COLOR_MARKED,
	COLOR_OPENED,
	COLOR_WHITE,
	CELL_MARKED_CODE, CELL_BOMB_CODE, CELL_CLOSED_CODE
} from '../../config';
import Store from '../../index';
import Dispatcher from '../../store/Dispatcher';
import './style.css';
import { markCell, openCell } from '../../store/actions/gameActions';

const DEFAULT_SECTOR_WIDTH = 30;
const DEFAULT_SECTOR_HEIGHT = 20;

let prevEventListenerLeftClick;
let prevEventListenerRightClick;

export const FieldView = (x1, x2, y1, y2) => {
	const { dispatch } = Dispatcher;

	const canvas = document.getElementById('view-canvas');
	const ctx = canvas.getContext('2d');

	canvas.removeEventListener('click', prevEventListenerLeftClick);
	canvas.removeEventListener('contextmenu', prevEventListenerRightClick);

	const FIELD_WIDTH = (x2 - x1) || DEFAULT_SECTOR_WIDTH;
	const FIELD_HEIGHT = (y2 - y1) || DEFAULT_SECTOR_HEIGHT;

	canvas.width = FIELD_WIDTH * CELL_SIZE;
	canvas.height = FIELD_HEIGHT * CELL_SIZE;

	const renderGrid = () => {
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
	};

	const renderSelectedCells = (currentState) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		renderGrid();

		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				const currentCell = currentState.field[x][y];
				if (currentState.gameOver && currentCell === CELL_BOMB_CODE) {
					ctx.fillStyle = COLOR_BOMB;
					ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
						CELL_SIZE - 2, CELL_SIZE - 2);
					continue;
				}
				if (currentCell !== CELL_CLOSED_CODE && currentCell !== CELL_BOMB_CODE) {
					ctx.fillStyle = currentCell === CELL_MARKED_CODE
						? COLOR_MARKED
						: COLOR_OPENED;
					ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
						CELL_SIZE - 2, CELL_SIZE - 2);
					if (currentCell > 0 && currentCell < 9) {
						ctx.fillStyle = COLOR_WHITE;
						ctx.font = `bold ${FONT_SIZE}px Arial`;
						ctx.fillText(currentCell, (x - x1 + 0.3) * CELL_SIZE, (y - y1 + 0.7) * CELL_SIZE + 1);
					}
				}
			}
		}
	};

	Store.subscribe('canvas', renderSelectedCells);

	const rect = canvas.getBoundingClientRect();
	function handleClickCell (e){
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const coord_X = Math.floor(x / CELL_SIZE) + x1;
		const coord_Y = Math.floor(y / CELL_SIZE) + y1;

		dispatch(openCell(coord_X, coord_Y));
	}
	canvas.addEventListener('click', handleClickCell);
	prevEventListenerLeftClick = handleClickCell;

	function handleRightClickCell (e){
		e.preventDefault();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const coord_X = Math.floor(x / CELL_SIZE) + x1;
		const coord_Y = Math.floor(y / CELL_SIZE) + y1;

		dispatch(markCell(coord_X, coord_Y));
	}
	canvas.addEventListener('contextmenu', handleRightClickCell);
	prevEventListenerRightClick = handleRightClickCell;
};
