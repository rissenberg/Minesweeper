import { showNewGameMenu } from '../NewGameMenu/NewGameMenu';
import { IGameState } from '../../../store/types/types';
import Store from '../../../index';
import { disableScroll, enableScroll } from '../../../utils/disableScroll';

//
// Функция добавляющая обработчики на стартовое окно меню
// Ничего необычного
//
export const StartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.add('show');
	disableScroll();

	const continueBtn: HTMLButtonElement | null = document.querySelector('#continue-btn');
	const newGameBtn = document.getElementById('new-game-btn');


	// Если есть незавершенная игра, кнопка становится активной
	const renderContinueBtn = (currentState: IGameState) => {
		continueBtn!.disabled = !currentState.gameInProgress;
	};

	Store.subscribe('menu-continue-button', renderContinueBtn);		// Проверяется это условие в сторе

	continueBtn!.addEventListener('click', () => {
		hideStartMenu();
	});

	newGameBtn!.addEventListener('click', () => {
		hideStartMenu();
		showNewGameMenu();
	});

};

//
// Показать стартовое окно меню
//
export const hideStartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.remove('show');
	enableScroll();
};

//
// Скрыть стартовое окно меню
//
export const showStartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.add('show');
	disableScroll();
};