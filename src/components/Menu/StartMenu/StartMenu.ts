import { showNewGameMenu } from '../NewGameMenu/NewGameMenu';
import { IGameState } from '../../../store/types/types';
import Store from '../../../index';
import { disableScroll, enableScroll } from '../../../utils/disableScroll';


export const StartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.add('show');
	disableScroll();

	const continueBtn: HTMLButtonElement | null = document.querySelector('#continue-btn');
	const newGameBtn = document.getElementById('new-game-btn');

	const renderContinueBtn = (currentState: IGameState) => {
		continueBtn!.disabled = !currentState.gameInProgress;
	};

	Store.subscribe('menu-continue-button', renderContinueBtn);

	continueBtn!.addEventListener('click', () => {
		hideStartMenu();
	});

	newGameBtn!.addEventListener('click', () => {
		showNewGameMenu();
		hideStartMenu();
	});

};

export const hideStartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.remove('show');
	enableScroll();
};

export const showStartMenu = () => {
	const startModal = document.getElementById('modal-start');
	if (!startModal)
		throw new Error('Could not locate start menu');

	startModal.classList.add('show');
	disableScroll();
};