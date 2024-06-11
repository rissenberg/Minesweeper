import Dispatcher from '../../store/Dispatcher';
import { CELL_SIZE } from '../../config';
import './style.scss';
import { FieldView } from '../FieldView/FieldView';
import { throttle } from '../../utils/throttle';
import { setPosition, newGame, fillMap } from '../../store/actions/gameActions';
import { removeMinimap, Minimap } from '../Minimap/Minimap';
import { ICallback } from '../../store/types/types';

const MINIMAP_TIMER = 2000;		// Показывает, сколько отображается миникарта

// Для очищения eventL listeners
let prevScrollHandler: ICallback;
let prevResizeHandler: ICallback;

//
// Компонент, реализующий виртуальную прокрутку игрового поля
//
export const Field = (width: number, height: number) => {
	const fieldContainer = document.getElementById('field-container');
	if (!fieldContainer)
		throw new Error('Could not locate field container');

	window.removeEventListener('scroll', prevScrollHandler);
	window.removeEventListener('resize', prevResizeHandler);

	const { dispatch } = Dispatcher;

	const renderDelay = width * height > 500000 ? 50 : 25;			// Эмпирически полученная закономерность, при каких значениях нужно менять задержку

	fieldContainer.style.width = `${width * CELL_SIZE}px`;
	fieldContainer.style.height = `${height * CELL_SIZE}px`;

	// Расчет размера видимой части поля
	let cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
	let cellNumY = Math.floor((window.innerHeight - 80) / CELL_SIZE);
	let windowScrollX = window.scrollX;
	let windowScrollY = window.scrollY;

	let minimapTimeout = 0;

	// Обработчик, вызывающий заполнение поля при первом клике на него
	// Таким образом обеспечивается гарантия безопасного старта, т.е. не на бомбе
	fieldContainer.addEventListener('click', (event) => {
		const canvas = document.getElementById('view-canvas');
		if (!canvas)
			throw new Error('Could not locate field canvas');

		const rect = canvas.getBoundingClientRect();

		// Текущее положение
		const x = Math.floor((event.clientX - rect.left) / CELL_SIZE)
            + Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y = Math.floor((event.clientY - rect.top) / CELL_SIZE)
            + Math.floor(windowScrollY / CELL_SIZE + 0.9);

		dispatch(fillMap(x, y));
	}, { once: true, capture: true });

	// Рассчет границ видимой области и вызов функции рендера этой части
	const renderView = () => {
		const x1 = Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y1 = Math.floor(windowScrollY / CELL_SIZE + 0.9);
		const x2 = x1 + cellNumX > width
			? width
			: x1 + cellNumX;
		const y2 = y1 + cellNumY > height
			? height
			: y1 + cellNumY;

		FieldView(x1, x2, y1, y2);

		// Если поле не выходит за границы экрана, миникарта не нужна
		if ((x2 - x1) < width || (y2 - y1) < height) {
			Minimap(x1, x2, y1, y2, width, height);
			clearTimeout(minimapTimeout);

			minimapTimeout = setTimeout(() => {
				removeMinimap();
			}, MINIMAP_TIMER);		// По этому таймеру миникарта выключается, чтобы не мешать игре
		}
		else
			removeMinimap();
	};

	renderView();

	// Обработчик на изменение размера окна браузера
	// Нужен для перерасчета границ видимой области
	// Throttle нужен для не слишком частого вызова этой функции и уменьшения нагрузки
	const handleWindowResize = throttle(() => {
		cellNumX = Math.floor((window.innerWidth - 40) / CELL_SIZE);
		cellNumY = Math.floor((window.innerHeight - 70) / CELL_SIZE);
		windowScrollX = window.scrollX;
		windowScrollY = window.scrollY;

		const x1 = Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y1 = Math.floor(windowScrollY / CELL_SIZE + 0.9);

		renderView();
		dispatch(setPosition(x1, y1));
	}, renderDelay);

	// Аналогичный обработчик на прокрутку страницы
	// Throttle нужен для не слишком частого вызова этой функции и уменьшения нагрузки
	const handleWindowScroll = throttle(() => {
		windowScrollX = window.scrollX;
		windowScrollY = window.scrollY;

		const x1 = Math.floor(windowScrollX / CELL_SIZE + 0.9);
		const y1 = Math.floor(windowScrollY / CELL_SIZE + 0.9);

		renderView();
		dispatch(setPosition(x1, y1));

	}, renderDelay);

	window.addEventListener('resize', handleWindowResize);
	window.addEventListener('scroll', handleWindowScroll);

	prevResizeHandler = handleWindowResize;
	prevScrollHandler = handleWindowScroll;		// Эти значения запоминаются для дальнейшего удаления при перезапуске игры
};
