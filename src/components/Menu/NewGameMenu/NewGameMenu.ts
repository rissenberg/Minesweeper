import '../style.scss';
import { Field } from '../../Field/Field';
import Dispatcher from '../../../store/Dispatcher';
import { newGame } from '../../../store/actions/gameActions';
import { disableScroll, enableScroll } from '../../../utils/disableScroll';
import { showStartMenu } from '../StartMenu/StartMenu';

//
// Функция добавляющая обработчики на окно "Новая игра"
// Ничего необычного
//
export const NewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	const easyBtn = document.getElementById('new-game-btn-easy');
	const mediumBtn = document.getElementById('new-game-btn-medium');
	const expertBtn = document.getElementById('new-game-btn-expert');

	const backBtn = document.getElementById('back-btn');

	const form = document.getElementById('new-game-form');
	const errorLabel = document.getElementById('new-game-error-label');

	const widthInput: HTMLInputElement | null = newGameModal.querySelector('#width-input');
	const heightInput:  HTMLInputElement | null = newGameModal.querySelector('#height-input');
	const minesInput:  HTMLInputElement | null = newGameModal.querySelector('#mines-input');

	// Значения для режима "Новичок" по умолчанию
	easyBtn!.addEventListener('click', () => {
		widthInput!.value = '9';
		heightInput!.value = '9';
		minesInput!.value = '10';
	});

	// Значения для режима "Продвинутый" по умолчанию
	mediumBtn!.addEventListener('click', () => {
		widthInput!.value = '16';
		heightInput!.value = '16';
		minesInput!.value = '40';
	});

	// Значения для режима "Эксперт" по умолчанию
	expertBtn!.addEventListener('click', () => {
		widthInput!.value = '16';
		heightInput!.value = '30';
		minesInput!.value = '99';
	});

	backBtn!.addEventListener('click', (e) => {
		e.preventDefault();
		hideNewGameMenu();
		showStartMenu();
	});

	form!.addEventListener('submit', (e) => {
		e.preventDefault();
		const width = +widthInput!.value;
		const height = +heightInput!.value;
		const mines = +minesInput!.value;

		if ( width < 4 || width > 10000
			|| height < 4 || height > 10000
			|| mines < 1 || mines > (width * height - 1)
		) {
			errorLabel!.classList.remove('display-none');
			return;
		} else {
			errorLabel!.classList.add('display-none');
		}

		// Этой последовательностью создается новая игра с заданными параметрами
		hideNewGameMenu();
		window.scroll(0, 0);
		Field(width, height);
		Dispatcher.dispatch(newGame(width, height, mines));

	});

};

//
// Показать окно "Новая игра"
//
export const hideNewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	newGameModal.classList.remove('show');
	enableScroll();
};

//
// Скрыть окно "Новая игра"
//
export const showNewGameMenu = () => {
	const newGameModal = document.getElementById('modal-new-game');
	if (!newGameModal)
		throw new Error('Could not locate start menu');

	newGameModal.classList.add('show');
	disableScroll();
};