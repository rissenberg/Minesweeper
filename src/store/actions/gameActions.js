export const gameTypes = {
    SET_POSITION: 'SET_POSITION',
    OPEN_CELL: 'OPEN_CELL',
    NEW_GAME: 'NEW_GAME',
    FILL_MAP: 'FILL_MAP',
    MARK_CELL: 'MARK_CELL',
}

export const setPosition = (x, y) => ({
    type: gameTypes.SET_POSITION,
    payload: {
        x,
        y
    },
});

export const openCell = (x, y) => ({
    type: gameTypes.OPEN_CELL,
    payload: {
        x,
        y
    },
});

export const markCell = (x, y) => ({
    type: gameTypes.MARK_CELL,
    payload: {
        x,
        y
    },
});

export const newGame = (width, height, mines) => ({
    type: gameTypes.NEW_GAME,
    payload: {
        width,
        height,
        mines
    },
});

export const fillMap = (position) => ({
    type: gameTypes.FILL_MAP,
    payload: {
        position
    },
});

