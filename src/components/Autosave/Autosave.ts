import { IGameState } from '../../store/types/types';
import Store from '../../index';
import { throttle } from '../../utils/throttle';
import { IAutosaveProps } from './types';

export const enableAutosave = () => {
	const autosave = (currentState: IGameState) => {
		if (currentState.gameWon || currentState.gameOver) {
			localStorage.removeItem('autosave');
			return;
		}

		if (!currentState.gameInProgress)
			return;

		const width = currentState.width;
		const height = currentState.height;
		const mines = currentState.mines;
		const leftClosed = currentState.leftClosed;
		const x = currentState.position.x;
		const y = currentState.position.y;
		const field = currentState.field;

		const savedData = [width, height, mines, leftClosed, x, y, ...field].join(',');

		localStorage.setItem('autosave', savedData);
	};

	Store.subscribe('autosave', throttle(autosave, 1000));
};

export const getAutosavedData = (): IAutosaveProps | undefined => {
	const data = localStorage.getItem('autosave')?.split(',');

	if (!data)
		return;

	const width = +data.shift()!;
	const height = +data.shift()!;
	const mines = +data.shift()!;
	const leftClosed = +data.shift()!;
	const x = +data.shift()!;
	const y = +data.shift()!;
	const field: number[][] = [];

	for (let x = 0; x < width; x++) {
		field[x] = [];
		for (let y = 0; y < height; y++) {
			field[x][y] = +data[x * height + y];
		}
	}

	return {
		width,
		height,
		mines,
		leftClosed,
		field,
		x, y
	};
};
