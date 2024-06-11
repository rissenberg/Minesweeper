export type IAction = {
	type: string,
	payload: any
};

export type IReducer<T> = (state: T, action: IAction) => T;

export interface IGameState {
	position: IPosition,
	width: number,
	height: number,
	mines: number,
	leftClosed: number,
	field: number[][],
	gameOver: boolean,
	gameWon: boolean,
	gameInProgress: boolean,
}

export type IPosition = {
	x: number;
	y: number;
}

export type ICallback = (arg: any) => void;
