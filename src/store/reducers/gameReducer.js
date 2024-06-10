import { gameTypes } from '../actions/gameActions';
import { fillMapWithBombs, markCell, openCell } from './lib/gameLogic';
import { CELL_CLOSED_CODE } from '../../config';

export const gameReducer = (state, action) => {
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

		return newState;


	case gameTypes.FILL_MAP:
		newState.field = fillMapWithBombs(
			newState.width,
			newState.height,
			newState.mines,
			action.payload.position,
		);

		return newState;


	case gameTypes.OPEN_CELL:
		if (newState.gameOver || newState.gameWon)
			return state;

		const counter = openCell(newState.field, action.payload);

		if (counter === 0)
			return state;

		if (counter === -1)
			newState.gameOver = true;
		else
			newState.leftClosed -= counter;

		if (newState.leftClosed <= newState.mines)
			newState.gameWon = true;

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

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
