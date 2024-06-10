import Store from './store/Store';
import Dispatcher from './store/Dispatcher';
import './style.scss';
import { Field } from './components/Field/Field';
import { gameReducer } from './store/reducers/gameReducer';
import { Navbar } from './components/Navbar/Navbar';
import { IGameState } from './store/types/types';

const initialState: IGameState = {
	position: {
		x: 0,
		y: 0,
	},
	width: 0,
	height: 0,
	mines: 0,
	leftClosed: 0,
	field: [],
	gameOver: false,
	gameWon: false,
};

const store = new Store(gameReducer, initialState);
Dispatcher.subscribe(store.doAction);

export default store;

Navbar();
Field(2000, 2000, 4000);
