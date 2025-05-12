import type { State, Transaction, TransactionData } from './types';

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';
export const RED = '#FF0000';
export const GREEN = '#00FF00';
export const BLUE = '#0000FF';

const initialState: State = [];
for (let i = 0; i < 10; i++) {
	let row = [];
	for (let j = 0; j < 10; j++) {
		row.push(WHITE);
	}
	initialState.push(row);
}

export function treeReduce(
	data: Transaction | undefined,
	fn: (originalState: State, transaction: TransactionData) => State
): State {
	if (data === undefined) {
		return initialState;
	}

	return fn(treeReduce(data.parent, fn), data.data);
}

export function reducer(originalState: State, transaction: TransactionData): State {
	let nextState = structuredClone($state.snapshot(originalState));

	if (transaction.type == 'set') {
		nextState[transaction.row][transaction.column] = transaction.color;
	} else if (transaction.type == 'fill') {
		// implement flood fill algorithm
		const targetColor = nextState[transaction.row][transaction.column];
		if (targetColor === transaction.color) {
			return nextState;
		}
		const stack = [[transaction.row, transaction.column]];
		while (stack.length > 0) {
			const [row, column] = stack.pop()!;
			if (nextState[row][column] === targetColor) {
				nextState[row][column] = transaction.color;
				if (row > 0) stack.push([row - 1, column]);
				if (row < nextState.length - 1) stack.push([row + 1, column]);
				if (column > 0) stack.push([row, column - 1]);
				if (column < nextState[row].length - 1) stack.push([row, column + 1]);
			}
		}
	}

	return nextState;
}

export function merge(left: Transaction | undefined, right: Transaction | undefined): Transaction {
	if (left === undefined) {
		return right!; // TODO: fix
	}
	if (right === undefined) {
		return left;
	}
	if (left === right) {
		return left;
	}

	let shouldBeBefore;
	let shouldBeAfter;
	if (left.timestamp < right.timestamp) {
		// left is before the right
		// so right should be after
		shouldBeBefore = left;
		shouldBeAfter = right;
	} else {
		shouldBeBefore = right;
		shouldBeAfter = left;
	}

	let parent = merge(shouldBeBefore, shouldBeAfter.parent);

	return {
		...shouldBeAfter,
		parent
	};
}
