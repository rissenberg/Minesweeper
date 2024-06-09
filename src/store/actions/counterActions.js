export const counterTypes = {
    INCREMENT_BY: 'INCREMENT_BY',
    DECREMENT_BY: 'DECREMENT_BY',
}

export const incrementBy = (value) => ({
    type: counterTypes.INCREMENT_BY,
    payload: value,
});

export const decrementBy = (value) => ({
    type: counterTypes.DECREMENT_BY,
    payload: value,
});
