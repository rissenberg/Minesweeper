import {MARKED_CELL_CODE} from "../../../config";

export const fillMapWithBombs = (width, height, mines, position) => {
    const bombs = [];
    const indexes = [];

    for (let x = 0; x < width; x++) {
        bombs[x] = [];
        for (let y = 0; y < height; y++) {
            bombs[x][y] = false;
            if (x === position.x && y === position.y)
                continue;
            indexes.push(x * height + y);
        }
    }

    shuffle(indexes);

    indexes.slice(0, mines).forEach(index => {
        bombs[Math.floor(index / height)][index % height] = true;
    });

    return bombs;
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const openCell = (bombs, cells, position) => {
    const { x, y } = position;

    if (cells[x][y] !== null)
        return 0;

    const bombsAround = checkBombsAround(bombs, x, y);
    if (bombsAround === -1)
        return -1;

    const queue = [{ x, y }];
    let openedCounter = 0;

    while (queue.length) {
        const { x, y } = queue.shift()
        if (cells[x][y] !== null && cells[x][y] !== MARKED_CELL_CODE)
            continue;

        openedCounter++;

        const bombsAround = checkBombsAround(bombs, x, y);

        cells[x][y] = bombsAround;
        if (bombsAround === 0) {
            if (bombs[x - 1]) {
                if (bombs[x - 1][y - 1] !== null)
                    queue.push({
                        x: x - 1,
                        y: y - 1,
                    });
                if (bombs[x - 1][y] !== null)
                    queue.push({
                        x: x - 1,
                        y: y,
                    });
                if (bombs[x - 1][y + 1] !== null)
                    queue.push({
                        x: x - 1,
                        y: y + 1,
                    });
            }

            if (bombs[x][y - 1] !== null)
                queue.push({
                    x: x,
                    y: y - 1,
                });
            if (bombs[x][y + 1] !== null)
                queue.push({
                    x: x,
                    y: y + 1,
                });

            if (bombs[x + 1] ) {
                if (bombs[x + 1][y - 1] !== null)
                    queue.push({
                        x: x + 1,
                        y: y - 1,
                    });
                if (bombs[x + 1][y] !== null)
                    queue.push({
                        x: x + 1,
                        y: y,
                    });
                if (bombs[x + 1][y + 1] !== null)
                    queue.push({
                        x: x + 1,
                        y: y + 1,
                    });
            }
        }
    }

    return openedCounter;
}

const checkBombsAround = (bombs, x, y) => {
    let counter = 0;

    if (bombs[x] && bombs[x][y])
        return -1;

    if (bombs[x - 1]) {
        if (bombs[x - 1][y - 1])
            counter++;
        if (bombs[x - 1][y])
            counter++;
        if (bombs[x - 1][y + 1])
            counter++;
    }
    if (bombs[x]) {
        if (bombs[x][y - 1])
            counter++;
        if (bombs[x][y + 1])
            counter++;
    }
    if (bombs[x + 1]) {
        if (bombs[x + 1][y - 1])
            counter++;
        if (bombs[x + 1][y])
            counter++;
        if (bombs[x + 1][y + 1])
            counter++;
    }

    return counter;
}

export const markCell = (cells, position) => {
    const {x, y} = position;

    if (cells[x][y] === null)
        cells[x][y] = MARKED_CELL_CODE;

    else if (cells[x][y] === MARKED_CELL_CODE)
        cells[x][y] = null;
}