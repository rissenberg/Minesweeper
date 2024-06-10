import { ICallback } from '../store/types/types';

export const throttle = (func: ICallback, delay: number) => {
	let inThrottle = false;
	let inDebounce = false;
	let timeoutId = 0;

	return function(...args: any) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;

			setTimeout(() => {
				inThrottle = false;
			}, delay);
		}

		if (inDebounce) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func.apply(this, args);
			inDebounce = false;
		}, delay);

		inDebounce = true;
	};
};
