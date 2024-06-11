import { ICallback } from '../store/types/types';

//
// Самописный Throttle с небольшим дополнением - в отличии от классического, этот вызывает функцию еще раз по окончание таймера
// Такое решение было необходимо для случаев, когда изменения скролла и размера окна завершаются лишь после последнего вызова, и все изменения не могли быть применены
//
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
