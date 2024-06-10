import {gameTypes} from "../actions/gameActions";
import {fillMapWithBombs, markCell, openCell} from "./lib/gameLogic";

export const gameReducer = (state, action) => {
    const newState = deepCopy(state);

    switch (action.type) {

        case gameTypes.SET_POSITION:
            newState.position = action.payload;
            return newState;


        case gameTypes.NEW_GAME:
            const {width, height, mines} = action.payload;

            newState.openedCells = new Array(width).fill(null)
                    .map(() => new Array(width).fill(null));

            newState.bombs = new Array(height).fill([]);

            newState.width = width;
            newState.height = height;
            newState.mines = mines;
            newState.leftClosed = width * height;
            newState.gameOver = false;
            newState.gameWon = false;

            return newState;


        case gameTypes.FILL_MAP:
            newState.bombs = fillMapWithBombs(
                newState.width,
                newState.height,
                newState.mines,
                action.payload.position,
            );

            return newState;


        case gameTypes.OPEN_CELL:
            if (newState.gameOver || newState.gameWon)
                return state;

            const counter = openCell(newState.bombs, newState.openedCells, action.payload);

            if (counter === 0)
                return state;

            if (counter === -1)
                newState.gameOver = true;
            else
                newState.leftClosed -= counter;

            if (newState.leftClosed === newState.mines)
                newState.gameWon = true;

            return newState;


        case gameTypes.MARK_CELL:
            if (newState.gameOver || newState.gameWon)
                return state;

            markCell(newState.openedCells, action.payload);
            return newState;


        default:
            return state;
    }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
