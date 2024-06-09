import {counterTypes} from "../actions/counterActions";

export const counterReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case counterTypes.INCREMENT_BY:
            newState.count += action.payload;
            return newState;

        case counterTypes.DECREMENT_BY:
            newState.count -= action.payload;
            return newState;

        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
