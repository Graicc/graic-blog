import { BLACK } from './lib.svelte';
import type { Transaction } from './types';

type State = {
	head: Transaction | undefined;
	previewHead: Transaction | undefined;
	color: string;
	toolType: 'set' | 'fill';
};

export const state: State = $state({
	head: undefined,
	previewHead: undefined,
	color: BLACK,
	toolType: 'set'
});
