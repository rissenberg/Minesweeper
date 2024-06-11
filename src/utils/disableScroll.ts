export const disableScroll = () => {
	document.body.classList.add('stop-scrolling');
};

export const enableScroll = () => {
	document.body.classList.remove('stop-scrolling');
};
