import {gameTypes} from "../actions/gameActions";
import {createInitialMap, openCell} from "../../lib/gameLogic";
import {MARKED_CELL_CODE} from "../../constants";

export const gameReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case gameTypes.SET_POSITION:
            newState.position = action.payload;
            return newState;

        case gameTypes.INIT_MAP:
            newState.openedCells = [];
            newState.fieldMap = [];
            for (let x = 0; x < action.payload.width; x++) {
                newState.openedCells[x] = [];
                newState.fieldMap[x] = [];
                for (let y = 0; y < action.payload.height; y++)
                    newState.openedCells[x][y] = null;
            }
            newState.width = action.payload.width;
            newState.height = action.payload.height;
            newState.mines = action.payload.mines;
            newState.leftClosed = newState.width * newState.height;
            newState.gameOver = false;
            newState.gameWon = false;

            return newState;

        case gameTypes.FILL_MAP:
            newState.fieldMap = createInitialMap(
                newState.width,
                newState.height,
                newState.mines,
                action.payload.position,
            );

            return newState;

        case gameTypes.OPEN_CELL:
            if (newState.gameOver || newState.gameWon)
                return newState;

            const counter = openCell(newState.fieldMap, newState.openedCells, action.payload);
            if (counter === -1)
                newState.gameOver = true;
            else
                newState.leftClosed -= counter;

            if (newState.leftClosed === newState.mines)
                newState.gameWon = true;

            return newState;

        case gameTypes.MARK_CELL:
            if (newState.gameOver || newState.gameWon)
                return newState;

            const {x, y} = action.payload;

            if (newState.openedCells[x][y] === null) {
                newState.openedCells[x][y] = MARKED_CELL_CODE;
                return newState;
            }

            if (newState.openedCells[x][y] === MARKED_CELL_CODE)
                newState.openedCells[x][y] = null;

            return newState;

        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
