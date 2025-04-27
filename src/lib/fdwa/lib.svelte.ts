import type { State, Transaction, TransactionData } from './types';

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';

const initialState: State = [];
for (let i = 0; i < 10; i++) {
	let row = [];
	for (let j = 0; j < 10; j++) {
		row.push(BLACK);
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

export function reduce(originalState: State, transaction: TransactionData): State {
	let nextState = structuredClone($state.snapshot(originalState));

	if (transaction.type == 'set') {
		nextState[transaction.row][transaction.column] = transaction.color;
	} else if (transaction.type == 'clear') {
		nextState = nextState.map((row) => row.map((item) => BLACK));
	}

	return nextState;
}
