export const throttle = (func, delay) => {
    let inThrottle = false;
    let inDebounce = false;
    let timeoutId;

    return function() {
        const args = arguments;

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
}
