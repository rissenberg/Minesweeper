//
// Очеред уникальных объектов
// Была создана как оптимизация в алгоритме BFS, не принимающая на вход дублирующиеся элементы, но на практике показала перформанс худше. Не используется
// Хотел бы я ее доработать и вставить обратно в код, тогда производительность алгоритма открытия пустых ячеек (самый затратный из всех) стал бы работать на ~20% быстрее
//
export class UniqueObjectQueue {
	queue = new Set();

	add (item: any) {
		this.queue.add(JSON.stringify(item));
	}

	shift () {
		const firstElement = this.queue.values().next().value;
		this.queue.delete(firstElement);

		return JSON.parse(firstElement);
	}

	size () {
		return this.queue.size;
	}
}
