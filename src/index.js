import Store from './store/Store';
import Dispatcher from './store/Dispatcher';
import './style.css';
import { Field } from './components/Field/Field';
import { gameReducer } from './store/reducers/gameReducer';
import { Navbar } from './components/Navbar/Navbar';

const initialState = {
	position: {
		x: 0,
		y: 0,
	},
	width: 0,
	height: 0,
	mines: 0,
};

const store = new Store(gameReducer, initialState);
Dispatcher.subscribe(store.doAction);

export default store;

Navbar();
Field(20, 20, 10);
