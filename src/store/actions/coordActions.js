export const mapTypes = {
    SET_POSITION: 'SET_POSITION',
    OPEN_CELL: 'OPEN_CELL',
    INIT_MAP: 'INIT_MAP',
    FILL_MAP: 'FILL_MAP',
    MARK_CELL: 'MARK_CELL',
}

export const setPosition = (x, y) => ({
    type: mapTypes.SET_POSITION,
    payload: {
        x,
        y
    },
});

export const openCell = (x, y) => ({
    type: mapTypes.OPEN_CELL,
    payload: {
        x,
        y
    },
});

export const markCell = (x, y) => ({
    type: mapTypes.MARK_CELL,
    payload: {
        x,
        y
    },
});

export const initMap = (width, height, mines) => ({
    type: mapTypes.INIT_MAP,
    payload: {
        width,
        height,
        mines
    },
});

export const fillMap = (position) => ({
    type: mapTypes.FILL_MAP,
    payload: {
        position
    },
});

