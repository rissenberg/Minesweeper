import {MARKED_CELL_CODE} from "../constants";

export const createInitialMap = (width, height, mines, position) => {
    const field = [];
    const indexes = [];

    for (let x = 0; x < width; x++) {
        field[x] = [];
        for (let y = 0; y < height; y++) {
            field[x][y] = false;
            if (x === position.x && y === position.y)
                continue;
            indexes.push(x * height + y);
        }
    }

    shuffle(indexes);

    indexes.slice(0, mines).forEach(index => {
        field[Math.floor(index / height)][index % height] = true;
    });

    return field;
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const openCell = (fieldMap, openedCells, position) => {
    if (openedCells[position.x][position.y] !== null)
        return 0;

    const bombsAround = checkBombsAround(fieldMap, position.x, position.y);

    if (bombsAround === -1)
        return -1;

    const queue = [{ x: position.x, y: position.y}];
    let openedCounter = 0;

    while (queue.length) {
        const { x, y } = queue.shift()
        if (openedCells[x][y] !== null && openedCells[x][y] !== MARKED_CELL_CODE)
            continue;

        openedCounter++;

        const bombsAround = checkBombsAround(fieldMap, x, y);

        openedCells[x][y] = bombsAround;
        if (bombsAround === 0) {
            if (fieldMap[x - 1]) {
                if (fieldMap[x - 1][y - 1] !== null)
                    queue.push({
                        x: x - 1,
                        y: y - 1,
                    });
                if (fieldMap[x - 1][y] !== null)
                    queue.push({
                        x: x - 1,
                        y: y,
                    });
                if (fieldMap[x - 1][y + 1] !== null)
                    queue.push({
                        x: x - 1,
                        y: y + 1,
                    });
            }

            if (fieldMap[x][y - 1] !== null)
                queue.push({
                    x: x,
                    y: y - 1,
                });
            if (fieldMap[x][y + 1] !== null)
                queue.push({
                    x: x,
                    y: y + 1,
                });

            if (fieldMap[x + 1] ) {
                if (fieldMap[x + 1][y - 1] !== null)
                    queue.push({
                        x: x + 1,
                        y: y - 1,
                    });
                if (fieldMap[x + 1][y] !== null)
                    queue.push({
                        x: x + 1,
                        y: y,
                    });
                if (fieldMap[x + 1][y + 1] !== null)
                    queue.push({
                        x: x + 1,
                        y: y + 1,
                    });
            }
        }
    }

    return openedCounter;
}

const checkBombsAround = (fieldMap, x, y) => {
    let counter = 0;

    if (fieldMap[x] && fieldMap[x][y])
        return -1;

    if (fieldMap[x - 1]) {
        if (fieldMap[x - 1][y - 1])
            counter++;
        if (fieldMap[x - 1][y])
            counter++;
        if (fieldMap[x - 1][y + 1])
            counter++;
    }
    if (fieldMap[x]) {
        if (fieldMap[x][y - 1])
            counter++;
        if (fieldMap[x][y + 1])
            counter++;
    }
    if (fieldMap[x + 1]) {
        if (fieldMap[x + 1][y - 1])
            counter++;
        if (fieldMap[x + 1][y])
            counter++;
        if (fieldMap[x + 1][y + 1])
            counter++;
    }

    return counter;
}