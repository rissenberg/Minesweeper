import {
	CELL_SIZE,
	FONT_SIZE,
	COLOR_BORDER,
	COLOR_CLOSED,
	COLOR_BOMB,
	COLOR_MARKED,
	COLOR_OPENED,
	COLOR_WHITE,
	CELL_MARKED_CODE, CELL_BOMB_CODE, CELL_CLOSED_CODE, CELL_MARKED_BOMB_CODE
} from '../../config';
import Store from '../../index';
import Dispatcher from '../../store/Dispatcher';
import './style.scss';
import { markCell, openCell } from '../../store/actions/gameActions';
import { ICallback, IGameState } from '../../store/types/types';

const DEFAULT_SECTOR_WIDTH = 30;
const DEFAULT_SECTOR_HEIGHT = 20;

// Для очищения event listeners
let prevEventListenerLeftClick: ICallback;
let prevEventListenerRightClick: ICallback;

//
// Функция рендер видимой области игровой карты
// Принимает на вход координаты границ видимой области
//
export const FieldView = (x1: number, x2: number, y1: number, y2: number) => {
	const { dispatch } = Dispatcher;

	const canvas: HTMLCanvasElement | null = document.querySelector('#view-canvas');
	if (!canvas)
		throw new Error('Could not locate field canvas');

	const ctx = canvas.getContext('2d');
	if (!ctx)
		throw new Error('Could not use field canvas context');

	// Удаление старых обработчиков, потому что координаты поменялись
	canvas.removeEventListener('click', prevEventListenerLeftClick);
	canvas.removeEventListener('contextmenu', prevEventListenerRightClick);

	const FIELD_WIDTH = (x2 - x1) || DEFAULT_SECTOR_WIDTH;
	const FIELD_HEIGHT = (y2 - y1) || DEFAULT_SECTOR_HEIGHT;

	canvas.width = FIELD_WIDTH * CELL_SIZE;
	canvas.height = FIELD_HEIGHT * CELL_SIZE;

	// Отрисовка сетки поля
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

	// Функция, рендерящая по данным из Store состояния ячеек в видимой области
	// Подробнее о состояниях ячеек в файле constants
	const renderSelectedCells = (currentState: IGameState) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		renderGrid();

		// Проходим по всей видимой области
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++) {
				const currentCell = currentState.field[x][y];

				// При поражении отображаются все бомбы
				if (currentState.gameOver && currentCell === CELL_BOMB_CODE) {
					ctx.fillStyle = COLOR_BOMB;
					ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
						CELL_SIZE - 2, CELL_SIZE - 2);
					continue;
				}

				// Отображение открытых ячеек и помеченных флагами
				if (currentCell !== CELL_CLOSED_CODE && currentCell !== CELL_BOMB_CODE) {
					ctx.fillStyle = currentCell === CELL_MARKED_CODE || currentCell === CELL_MARKED_BOMB_CODE
						? COLOR_MARKED
						: COLOR_OPENED;
					ctx.fillRect((x - x1) * CELL_SIZE + 1, (y - y1) * CELL_SIZE + 1,
						CELL_SIZE - 2, CELL_SIZE - 2);

					// Так же, если рядом с клеткой стоят бомбы, их количество нужно показать
					if (currentCell > 0 && currentCell < 9) {
						ctx.fillStyle = COLOR_WHITE;
						ctx.font = `bold ${FONT_SIZE}px Arial`;
						ctx.fillText(currentCell.toString(), (x - x1 + 0.3) * CELL_SIZE, (y - y1 + 0.7) * CELL_SIZE + 1);
					}
				}
			}
		}
	};

	Store.subscribe('canvas', renderSelectedCells);


	// Обработчик левого клика и подсчет координаты текущей ячейки
	const rect = canvas.getBoundingClientRect();
	function handleClickCell (e: MouseEvent){
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const coord_X = Math.floor(x / CELL_SIZE) + x1;
		const coord_Y = Math.floor(y / CELL_SIZE) + y1;

		dispatch(openCell(coord_X, coord_Y));
	}

	canvas.addEventListener('click', handleClickCell);
	prevEventListenerLeftClick = handleClickCell;


	// Обработчик правого клика и подсчет координаты текущей ячейки
	function handleRightClickCell (e: MouseEvent){
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
