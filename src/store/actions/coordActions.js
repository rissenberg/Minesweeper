export const mapTypes = {
    SET_POSITION: 'SET_POSITION',
    OPEN_CELL: 'OPEN_CELL',
    INIT_MAP: 'INIT_MAP',
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

export const initMap = (width, height) => ({
    type: mapTypes.INIT_MAP,
    payload: {
        width,
        height
    },
});

