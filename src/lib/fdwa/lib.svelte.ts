import type { State, Transaction, TransactionData } from './types';

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';
export const RED = '#FF0000';
export const GREEN = '#00FF00';
export const BLUE = '#0000FF';

// const initialState: State = [];
// for (let i = 0; i < 10; i++) {
// 	let row = [];
// 	for (let j = 0; j < 10; j++) {
// 		row.push(WHITE);
// 	}
// 	initialState.push(row);
// }
const SIZE = 10;
const initialState: State = Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(WHITE));

const globalCache = new WeakMap<(_: any, __: any) => any, WeakMap<Transaction, State>>();

export function isEqual(left: Transaction, right: Transaction): boolean {
    if (left.timestamp.getTime() != right.timestamp.getTime()) return false;
    if (left.data.type != right.data.type) return false;
    if (left.data.row != right.data.row) return false;
    if (left.data.column != right.data.column) return false;
    if (left.data.color != right.data.color) return false;

    // We aren't going to check the parents here
    return true;
}

export function treeReduce(
    data: Transaction | undefined,
    fn: (originalState: State, transaction: TransactionData) => State
): State {
    if (data === undefined) {
        return initialState;
    }

    if (globalCache.has(fn)) {
        const cache = globalCache.get(fn)!;
        if (cache.has(data)) {
            return cache.get(data)!;
        }
    }

    const result = fn(treeReduce(data.parent, fn), data.data);

    if (!globalCache.has(fn)) {
        globalCache.set(fn, new WeakMap<Transaction, State>());
    }

    const cache = globalCache.get(fn)!;
    cache.set(data, result);

    return result;
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
    // if (left === right) {
    if (isEqual(left, right)) {
        // isEqual isn't recursive, so it's possible that there was a differnece in the history
        let parent = merge(left.parent, right.parent);
        if (parent === left.parent) {
            return left;
        } else if (parent === right.parent) {
            return right;
        } else {
            return {
                ...left,
                parent
            }
        }
    }

    let shouldBeBefore;
    let shouldBeAfter;
    if (left.timestamp < right.timestamp) {
        // left is before the right
        // so right should be after
        shouldBeBefore = left;
        shouldBeAfter = right;
    } else if (left.timestamp > right.timestamp) {
        shouldBeBefore = right;
        shouldBeAfter = left;
    } else {
        console.log('same timestamp but not equal?');
        return left;
    }

    let parent = merge(shouldBeBefore, shouldBeAfter.parent);

    return {
        ...shouldBeAfter,
        parent
    };
}
