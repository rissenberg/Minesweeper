import { CELL_BOMB_CODE, CELL_CLOSED_CODE, CELL_MARKED_BOMB_CODE, CELL_MARKED_CODE } from '../../../config';
import { IPosition } from '../../types/types';

export const fillMapWithBombs = (width: number, height: number, mines: number, position: IPosition) => {
	const field: number[][] = [];
	const indexes: number[] = [];

	for (let x = 0; x < width; x++) {
		field[x] = [];
		for (let y = 0; y < height; y++) {
			field[x][y] = CELL_CLOSED_CODE;
			if (x === position.x && y === position.y)
				continue;
			indexes.push(x * height + y);
		}
	}

	shuffle(indexes);

	indexes.slice(0, mines).forEach(index => {
		field[Math.floor(index / height)][index % height] = CELL_BOMB_CODE;
	});

	return field;
};

const shuffle = <T>(array: Array<T>) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const openCell = (field: number[][], position: IPosition) => {
	const { x, y } = position;

	if (field[x][y] !== CELL_CLOSED_CODE && field[x][y] !== CELL_BOMB_CODE)
		return 0;

	const bombsAround = countBombsAround(field, x, y);
	if (bombsAround === -1)
		return -1;

	const queue: IPosition[] = [ { x, y } ];
	let openedCounter = 0;

	while (queue.length) {
		const { x, y } = queue.shift() ?? { x: -1, y: -1 };
		if (!isCellUnchecked(field[x][y]))
			continue;

		openedCounter++;

		const bombsAround = countBombsAround(field, x, y);

		field[x][y] = bombsAround;
		if (bombsAround === 0) {
			if (field[x - 1]) {
				if (isCellUnchecked(field[x - 1][y - 1]))
					queue.push({
						x: x - 1,
						y: y - 1,
					});
				if (isCellUnchecked(field[x - 1][y]))
					queue.push({
						x: x - 1,
						y: y,
					});
				if (isCellUnchecked(field[x - 1][y + 1]))
					queue.push({
						x: x - 1,
						y: y + 1,
					});
			}

			if (isCellUnchecked(field[x][y - 1]))
				queue.push({
					x: x,
					y: y - 1,
				});
			if (isCellUnchecked(field[x][y + 1]))
				queue.push({
					x: x,
					y: y + 1,
				});

			if (field[x + 1]) {
				if (isCellUnchecked(field[x + 1][y - 1]))
					queue.push({
						x: x + 1,
						y: y - 1,
					});
				if (isCellUnchecked(field[x + 1][y]))
					queue.push({
						x: x + 1,
						y: y,
					});
				if (isCellUnchecked(field[x + 1][y + 1]))
					queue.push({
						x: x + 1,
						y: y + 1,
					});
			}
		}
	}

	return openedCounter;
};

const isCellUnchecked = (cell: number): boolean => {
	return cell === CELL_CLOSED_CODE || cell === CELL_MARKED_CODE || cell === CELL_MARKED_BOMB_CODE;
};

const countBombsAround = (field: number[][], x: number, y: number) => {
	let counter = 0;

	if (field[x] && field[x][y] === CELL_BOMB_CODE
		|| field[x] && field[x][y] === CELL_MARKED_BOMB_CODE)
		return -1;

	if (field[x - 1]) {
		if (field[x - 1][y - 1] === CELL_BOMB_CODE
			|| field[x - 1][y - 1] === CELL_MARKED_BOMB_CODE)
			counter++;
		if (field[x - 1][y] === CELL_BOMB_CODE
			|| field[x - 1][y] === CELL_MARKED_BOMB_CODE)
			counter++;
		if (field[x - 1][y + 1] === CELL_BOMB_CODE
			|| field[x - 1][y + 1] === CELL_MARKED_BOMB_CODE)
			counter++;
	}
	if (field[x]) {
		if (field[x][y - 1] === CELL_BOMB_CODE
			|| field[x][y - 1] === CELL_MARKED_BOMB_CODE)
			counter++;
		if (field[x][y + 1] === CELL_BOMB_CODE
			|| field[x][y + 1] === CELL_MARKED_BOMB_CODE)
			counter++;
	}
	if (field[x + 1]) {
		if (field[x + 1][y - 1] === CELL_BOMB_CODE
			|| field[x + 1][y - 1] === CELL_MARKED_BOMB_CODE)
			counter++;
		if (field[x + 1][y] === CELL_BOMB_CODE
			|| field[x + 1][y] === CELL_MARKED_BOMB_CODE)
			counter++;
		if (field[x + 1][y + 1] === CELL_BOMB_CODE
			|| field[x + 1][y + 1] === CELL_MARKED_BOMB_CODE)
			counter++;
	}

	return counter;
};

export const markCell = (field: number[][], position: IPosition) => {
	const { x, y } = position;

	switch (field[x][y]) {
	case CELL_CLOSED_CODE:
		field[x][y] = CELL_MARKED_CODE;
		break;
	case CELL_BOMB_CODE:
		field[x][y] = CELL_MARKED_BOMB_CODE;
		break;
	case CELL_MARKED_CODE:
		field[x][y] = CELL_CLOSED_CODE;
		break;
	case CELL_MARKED_BOMB_CODE:
		field[x][y] = CELL_BOMB_CODE;
		break;
	}
};