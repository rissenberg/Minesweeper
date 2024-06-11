import { gameTypes } from '../actions/gameActions';
import { fillMapWithBombs, markCell, openCell } from './lib/gameLogic';
import { CELL_CLOSED_CODE } from '../../config';
import { IAction } from '../types/types';
import { IGameState } from '../types/types';

export const gameReducer = (state: IGameState, action: IAction): IGameState => {
	const newState = deepCopy(state);

	switch (action.type) {

	case gameTypes.SET_POSITION:
		newState.position = action.payload;
		return newState;


	case gameTypes.NEW_GAME:
		const { width, height, mines } = action.payload;

		newState.field = new Array(width).fill(0)
			.map(() => new Array(height).fill(CELL_CLOSED_CODE));

		newState.width = width;
		newState.height = height;
		newState.mines = mines;
		newState.leftClosed = width * height;
		newState.gameOver = false;
		newState.gameWon = false;
		newState.gameInProgress = false;

		return newState;


	case gameTypes.LOAD_GAME:
		const { x, y } = action.payload;

		newState.field = action.payload.field;
		newState.width = action.payload.width;
		newState.height = action.payload.height;
		newState.mines = action.payload.mines;
		newState.leftClosed = action.payload.leftClosed;
		newState.position = { x, y };
		newState.gameInProgress = true;

		return newState;


	case gameTypes.FILL_MAP:
		if (newState.gameInProgress)
			return state;

		newState.field = fillMapWithBombs(
			newState.width,
			newState.height,
			newState.mines,
			action.payload,
		);
		newState.gameInProgress = true;

		return newState;


	case gameTypes.OPEN_CELL:
		if (newState.gameOver || newState.gameWon)
			return state;

		const counter = openCell(newState.field, action.payload);

		if (counter === 0)
			return state;

		if (counter === -1) {
			newState.gameOver = true;
			newState.gameInProgress= false;
		}

		else
			newState.leftClosed -= counter;

		if (newState.leftClosed <= newState.mines) {
			newState.gameWon = true;
			newState.gameInProgress = false;
		}

		return newState;


	case gameTypes.MARK_CELL:
		if (newState.gameOver || newState.gameWon)
			return state;

		markCell(newState.field, action.payload);
		return newState;


	default:
		return state;
	}
};

const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
