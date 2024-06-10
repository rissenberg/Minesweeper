import {mapTypes} from "../actions/coordActions";
import {createInitialMap, openCell} from "../../lib/gameLogic";

export const mapReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case mapTypes.SET_POSITION:
            newState.position = action.payload;
            return newState;

        case mapTypes.INIT_MAP:
            newState.fieldMap = createInitialMap(
                action.payload.width,
                action.payload.height,
                action.payload.mines,
                action.payload.position,
            );

            newState.openedCells = [];
            for (let x = 0; x < action.payload.width; x++) {
                newState.openedCells[x] = [];
                for (let y = 0; y < action.payload.height; y++)
                    newState.openedCells[x][y] = null;
            }

            return newState;

        case mapTypes.OPEN_CELL:
            openCell(newState.fieldMap, newState.openedCells, action.payload);
            return newState;

        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
