import {mapTypes} from "../actions/coordActions";

export const mapReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case mapTypes.SET_POSITION:
            newState.position = action.payload;
            return newState;

        case mapTypes.INIT_MAP:
            newState.fieldMap = [];
            for (let x = 0; x < action.payload.width; x++) {
                newState.fieldMap[x] = [];
                for (let y = 0; y < action.payload.height; y++)
                    newState.fieldMap[x][y] = 0;
            }
            newState.fieldMap[20][20] = 1;
            newState.fieldMap[15][12] = 1;
            return newState;
        case mapTypes.OPEN_CELL:
            newState.fieldMap[action.payload.x][action.payload.y] = true;
            return newState;
        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
