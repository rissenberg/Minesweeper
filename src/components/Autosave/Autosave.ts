import { IGameState } from '../../store/types/types';
import Store from '../../index';
import { throttle } from '../../utils/throttle';
import { IAutosaveProps } from './types';

//
// Функция включения автосохранения - запсывает некоторые данные из хранилища flux в localstorage
//
export const enableAutosave = () => {
	const autosave = (currentState: IGameState) => {
		if (currentState.gameWon || currentState.gameOver) {
			localStorage.removeItem('autosave');		// Удаление сохранения при завершении игры
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

		if (savedData.length > 3_000_000)
			return;

		localStorage.setItem('autosave', savedData);
	};

	Store.subscribe('autosave', throttle(autosave, 1000));
};

//
// Функция парсинга строки из localstorage обратно к необходимому виду
//
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
