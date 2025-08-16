import { BLACK } from './lib.svelte';
import type { Transaction } from './types';

type State = {
	head: Transaction | undefined;
	heads: Array<Transaction>;
	previewHead: Transaction | undefined;
	color: string;
	toolType: 'set' | 'fill';
};

export const state: State = $state({
	head: undefined,
	heads: [],
	previewHead: undefined,
	color: BLACK,
	toolType: 'set'
});
