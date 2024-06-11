import '../style.scss';
import { Field } from '../../Field/Field';
import Dispatcher from '../../../store/Dispatcher';
import { newGame } from '../../../store/actions/gameActions';

export const NewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	newGameModal.classList.add('show');

	const easyBtn = document.getElementById('new-game-btn-easy');
	const mediumBtn = document.getElementById('new-game-btn-medium');
	const expertBtn = document.getElementById('new-game-btn-expert');

	const form = document.getElementById('new-game-form');
	const errorLabel = document.getElementById('new-game-error-label');

	const widthInput: HTMLInputElement | null = document.querySelector('#width-input');
	const heightInput:  HTMLInputElement | null = document.querySelector('#height-input');
	const minesInput:  HTMLInputElement | null = document.querySelector('#mines-input');

	easyBtn!.addEventListener('click', () => {
		widthInput!.value = '9';
		heightInput!.value = '9';
		minesInput!.value = '10';
	});

	mediumBtn!.addEventListener('click', () => {
		widthInput!.value = '16';
		heightInput!.value = '16';
		minesInput!.value = '40';
	});

	expertBtn!.addEventListener('click', () => {
		widthInput!.value = '16';
		heightInput!.value = '30';
		minesInput!.value = '99';
	});

	form!.addEventListener('submit', (e) => {
		e.preventDefault();
		const width = +widthInput!.value;
		const height = +heightInput!.value;
		const mines = +minesInput!.value;

		if ( width < 4 || width > 10000
			|| height < 4 || height > 1000
			|| mines < 1 || mines > (width * height - 1)
		) {
			errorLabel!.classList.remove('display-none');
			return;
		} else {
			errorLabel!.classList.add('display-none');
		}

		hideNewGameMenu();
		Field(width, height);
		Dispatcher.dispatch(newGame(width, height, mines));
	});

};

export const hideNewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	newGameModal.classList.remove('show');
};

export const showNewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	newGameModal.classList.add('show');
};