// Константы размеров для представления
export const CELL_SIZE = 25;
export const FONT_SIZE = 16;

// Цвета рендера
export const COLOR_CLOSED = '#dadada';
export const COLOR_BORDER = '#272727';
export const COLOR_BOMB = '#e65151';
export const COLOR_OPENED = '#93c6e8';
export const COLOR_MARKED = '#a5c750';
export const COLOR_WHITE = '#ffffff';

// Кодировки особых состояний ячеек - просто числа
export const CELL_BOMB_CODE = -1;
export const CELL_MARKED_CODE = 37;
export const CELL_MARKED_BOMB_CODE = 38;
export const CELL_CLOSED_CODE = 10;

// Подробнее о состояниях ячейки:
// Ячейка может быть либо с бомбой, либо пустой
// В случае бомбы у нее может быть всего два состояния:
// 		CELL_BOMB_CODE
// 		CELL_MARKED_BOMB_CODE - для обозначения помеченой флагом бомбы
// В случае пустой клетки состояния следующие:
//		CELL_CLOSED_CODE	- обозначает еще неоткрытую клетку
//		CELL_MARKED_CODE	- обозначает пустую клекту с флагом
// 		Число 0 - 8				- открытая клетка. Число равно числу бомб вокруг нее