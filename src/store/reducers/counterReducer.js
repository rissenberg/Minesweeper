import {coordTypes} from "../actions/coordActions";

export const coordReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case coordTypes.SET:
            newState.x = action.payload.x;
            newState.y = action.payload.y;
            return newState;

        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
