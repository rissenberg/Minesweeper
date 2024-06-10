import { CELL_BOMB_CODE, CELL_CLOSED_CODE, CELL_MARKED_CODE } from '../../../config';

export const fillMapWithBombs = (width, height, mines, position) => {
	const field = [];
	const indexes = [];

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

const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const openCell = (field, position) => {
	const { x, y } = position;

	if (field[x][y] !== CELL_CLOSED_CODE)
		return 0;

	const bombsAround = checkBombsAround(field, x, y);
	if (bombsAround === -1)
		return -1;

	const queue = [ { x, y } ];
	let openedCounter = 0;

	while (queue.length) {
		const { x, y } = queue.shift();
		if (!isCellUnchecked(field[x][y]))
			continue;

		openedCounter++;

		const bombsAround = checkBombsAround(field, x, y);

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

const isCellUnchecked = (cell) => {
	return cell === CELL_CLOSED_CODE || cell === CELL_MARKED_CODE;
};

const checkBombsAround = (field, x, y) => {
	let counter = 0;

	if (field[x] && field[x][y] === CELL_BOMB_CODE)
		return -1;

	if (field[x - 1]) {
		if (field[x - 1][y - 1] === CELL_BOMB_CODE)
			counter++;
		if (field[x - 1][y] === CELL_BOMB_CODE)
			counter++;
		if (field[x - 1][y + 1] === CELL_BOMB_CODE)
			counter++;
	}
	if (field[x]) {
		if (field[x][y - 1] === CELL_BOMB_CODE)
			counter++;
		if (field[x][y + 1] === CELL_BOMB_CODE)
			counter++;
	}
	if (field[x + 1]) {
		if (field[x + 1][y - 1] === CELL_BOMB_CODE)
			counter++;
		if (field[x + 1][y] === CELL_BOMB_CODE)
			counter++;
		if (field[x + 1][y + 1] === CELL_BOMB_CODE)
			counter++;
	}

	return counter;
};

export const markCell = (field, position) => {
	const { x, y } = position;

	if (field[x][y] === CELL_CLOSED_CODE)
		field[x][y] = CELL_MARKED_CODE;

	else if (field[x][y] === CELL_MARKED_CODE)
		field[x][y] = CELL_CLOSED_CODE;
};