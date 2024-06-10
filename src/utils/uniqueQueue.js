export class UniqueObjectQueue {
	queue = new Set();

	add (item) {
		this.queue.add(JSON.stringify(item));
	}

	shift () {
		const firstElement = this.queue.values().next().value;
		this.queue.delete(firstElement);

		console.log(firstElement);
		return JSON.parse(firstElement);
	}

	size () {
		return this.queue.size;
	}
}
