export const coordTypes = {
    SET: 'SET',
}

export const setCoord = (x, y) => ({
    type: coordTypes.SET,
    payload: {
        x,
        y
    },
});

