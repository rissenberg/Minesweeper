import { IAction } from '../types/types';
import { IAutosaveProps } from '../../components/Autosave/types';

// Опишу
export const gameTypes = {
	SET_POSITION: 'SET_POSITION',		// Установка координат видмой области
	OPEN_CELL: 'OPEN_CELL',					// Открыть выбранную ячейку
	NEW_GAME: 'NEW_GAME',						// Начать новую игру. Тут же задаются параметры размера поля и число бомб
	LOAD_GAME: 'LOAD_GAME',					// Загрузка игры из сохранения
	FILL_MAP: 'FILL_MAP',						// Заполнение поля бомбами, кроме выбранной клетки
	MARK_CELL: 'MARK_CELL',					// Отметить флагом выбранную ячейку
};

export const setPosition = (x: number, y: number): IAction => ({
	type: gameTypes.SET_POSITION,
	payload: {
		x,
		y
	},
});

export const openCell =  (x: number, y: number): IAction => ({
	type: gameTypes.OPEN_CELL,
	payload: {
		x,
		y
	},
});

export const markCell =  (x: number, y: number): IAction => ({
	type: gameTypes.MARK_CELL,
	payload: {
		x,
		y
	},
});

export const newGame = (width: number, height: number, mines: number): IAction => ({
	type: gameTypes.NEW_GAME,
	payload: {
		width,
		height,
		mines
	},
});

export const loadGame = (autosave: IAutosaveProps): IAction =>
	({
		type: gameTypes.LOAD_GAME,
		payload: autosave,
	});

export const fillMap =  (x: number, y: number): IAction => ({
	type: gameTypes.FILL_MAP,
	payload: {
		x,
		y
	},
});

