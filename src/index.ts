import Store from './store/Store';
import Dispatcher from './store/Dispatcher';
import './style.scss';
import { Field } from './components/Field/Field';
import { gameReducer } from './store/reducers/gameReducer';
import { Navbar } from './components/Navbar/Navbar';
import { IGameState } from './store/types/types';
import { NewGameMenu } from './components/Menu/NewGameMenu/NewGameMenu';
import { loadGame } from './store/actions/gameActions';
import { StartMenu } from './components/Menu/StartMenu/StartMenu';
import { enableAutosave, getAutosavedData } from './components/Autosave/Autosave';


const autosave = getAutosavedData();

const initialState: IGameState = {
	position: {
		x: 0,
		y: 0,
	},
	width: 60,
	height: 30,
	mines: 10,
	leftClosed: 0,
	field: [],
	gameOver: false,
	gameWon: false,
	gameInProgress: false,
};

const store = new Store(gameReducer, initialState);
Dispatcher.subscribe(store.doAction);

export default store;

Navbar();
StartMenu();
NewGameMenu();

if (autosave) {
	Field(autosave.width, autosave.height);
	Dispatcher.dispatch(loadGame(autosave));
}

enableAutosave();