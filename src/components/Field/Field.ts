import Dispatcher from '../../store/Dispatcher';
import { CELL_SIZE } from '../../config';
import './style.scss';
import { FieldView } from '../FieldView/FieldView';
import { throttle } from '../../utils/throttle';
import { setPosition, newGame, fillMap } from '../../store/actions/gameActions';
import { removeMinimap, Minimap } from '../Minimap/Minimap';
import { ICallback } from '../../store/types/types';

const MINIMAP_TIMER = 2000;

let prevScrollHandler: ICallback;
let prevResizeHandler: ICallback;

export const Field = (width: number, height: number) => {
	const fieldContainer = document.getElementById('field-container');
	if (!fieldContainer)
		throw new Error('Could not locate field container');

	window.removeEventListener('scroll', prevScrollHandler);
	window.removeEventListener('resize', prevResizeHandler);

	const { dispatch } = Dispatcher;

	const renderDelay = width * height > 500000 ? 50 : 25;

	fieldContainer.style.width = `${width * CELL_SIZE}px`;
	fieldContainer.style.height = `${height * CELL_SIZE}px`;

	let cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
	let cellNumY = Math.floor((window.innerHeight - 80) / CELL_SIZE);
	let windowScrollX = window.scrollX;
	let windowScrollY = window.scrollY;

	let minimapTimeout = 0;

	fieldContainer.addEventListener('click', (event) => {
		const canvas = document.getElementById('view-canvas');
		if (!canvas)
			throw new Error('Could not locate field canvas');

		const rect = canvas.getBoundingClientRect();

		const x = Math.floor((event.clientX - rect.left) / CELL_SIZE)
            + Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y = Math.floor((event.clientY - rect.top) / CELL_SIZE)
            + Math.floor(windowScrollY / CELL_SIZE + 0.9);

		dispatch(fillMap(x, y));
	}, { once: true, capture: true });

	const renderView = () => {
		windowScrollX = window.scrollX;
		windowScrollY = window.scrollY;

		const x1 = Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y1 = Math.floor(windowScrollY / CELL_SIZE + 0.9);
		const x2 = x1 + cellNumX > width
			? width
			: x1 + cellNumX;
		const y2 = y1 + cellNumY > height
			? height
			: y1 + cellNumY;

		dispatch(setPosition(x1, y1));

		FieldView(x1, x2, y1, y2);
		if ((x2 - x1) < width || (y2 - y1) < height) {
			Minimap(x1, x2, y1, y2, width, height);
			clearTimeout(minimapTimeout);

			minimapTimeout = setTimeout(() => {
				removeMinimap();
			}, MINIMAP_TIMER);
		}
		else
			removeMinimap();
	};

	renderView();

	const handleWindowResize = throttle(() => {
		cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
		cellNumY = Math.floor((window.innerHeight - 70) / CELL_SIZE);

		requestAnimationFrame(renderView);
	}, renderDelay);

	const handleWindowScroll = throttle(() => {
		requestAnimationFrame(renderView);
	}, renderDelay);

	window.addEventListener('resize', handleWindowResize);
	window.addEventListener('scroll', handleWindowScroll);

	prevResizeHandler = handleWindowResize;
	prevScrollHandler = handleWindowScroll;
};
