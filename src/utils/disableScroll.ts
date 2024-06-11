//
// Пара функций для удаление/возвращения возможности скролла на странице
// Используется при открытии окон меню для улучшения UX
//
export const disableScroll = () => {
	document.body.classList.add('stop-scrolling');
};

export const enableScroll = () => {
	document.body.classList.remove('stop-scrolling');
};
