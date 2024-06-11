import { COLOR_BOMB, COLOR_MARKED } from '../../config';
import store from '../../index';
import './style.scss';
import { IGameState } from '../../store/types/types';


export const Navbar = () => {
	const coordLabel = document.getElementById('coord-label');
	const minesLabel = document.getElementById('mines-label');
	const leftLabel = document.getElementById('left-label');
	const statusLabel = document.getElementById('status-label');

	function render(currentState: IGameState) {
		if (coordLabel)
			coordLabel.innerText = `Позиция: (${currentState.position.x}, ${currentState.position.y})`;
		if (minesLabel)
			minesLabel.innerText = `Мин: ${currentState.mines}`;
		if (leftLabel)
			leftLabel.innerText = `Осталось: ${currentState.leftClosed}`;

		if (currentState.gameOver && statusLabel) {
			statusLabel.innerText = 'Игра окончена';
			statusLabel.style.color = COLOR_BOMB;
		}
		if (currentState.gameWon && statusLabel) {
			statusLabel.innerText = 'Победа!';
			statusLabel.style.color = COLOR_MARKED;
		}
	}

	store.subscribe('navbar', render);
};