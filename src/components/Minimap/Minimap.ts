import { CELL_SIZE, COLOR_BORDER, COLOR_CLOSED, COLOR_BOMB } from '../../config';
import './style.scss';
import { ICallback } from '../../store/types/types';

let prevEventListener: ICallback;

export const Minimap = (
	x1: number, x2: number,
	y1: number, y2: number,
	width: number, height: number) =>
{
	const canvas: HTMLCanvasElement | null = document.querySelector('#minimap-canvas');
	if (!canvas)
		throw new Error('Could not locate minimap canvas');

	const ctx = canvas.getContext('2d');
	if (!ctx)
		throw new Error('Could not use minimap canvas context');

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	canvas.removeEventListener('click', prevEventListener);
	canvas.classList.add('show');

	ctx.fillStyle = COLOR_CLOSED;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = COLOR_BORDER;
	ctx.lineWidth = 3;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = COLOR_BOMB;
	ctx.lineWidth = 3;
	ctx.strokeRect(
		x1 / width * canvas.width + 1,
		y1 / height * canvas.height + 1,
		(x2-x1) / width * canvas.width - 2,
		(y2-y1)/ height * canvas.height - 2
	);

	const rect = canvas.getBoundingClientRect();
	function handleClickCell (event: MouseEvent) {
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const coord_X = Math.floor(x / canvas!.width * width * CELL_SIZE);
		const coord_Y = Math.floor(y / canvas!.height * height * CELL_SIZE);

		window.scroll(coord_X, coord_Y);
	}
	canvas.addEventListener('click', handleClickCell);
};

export const removeMinimap = () => {
	const canvas = document.getElementById('minimap-canvas');
	if (!canvas)
		throw new Error('Could not locate minimap canvas');
	canvas.removeEventListener('click', prevEventListener);
	canvas.classList.remove('show');
};