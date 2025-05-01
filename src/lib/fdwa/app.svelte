<script lang="ts">
	import ColorPicker from './colorPicker.svelte';
	import Grid from './grid.svelte';
	import History from './history.svelte';
	import { BLACK, reducer, treeReduce, WHITE } from './lib.svelte';
	import ToolPicker from './toolPicker.svelte';
	import type { State, Transaction, TransactionData } from './types';

	// let transactions: Array<TransactionData> = $state([]);
	let head: Transaction | undefined = $state(undefined);

	let previewHead: Transaction | undefined = $state(undefined);
	let historyComponent: History;

	// let grid = $derived(transactions.reduce(reduce, initialState));
	let grid = $derived(treeReduce(previewHead ?? head, reducer));
	// let grid = $derived(treeReduce(head, reducer));

	let color = $state(BLACK);
	let toolType: 'set' | 'fill' = $state('set');

	function onClick(row: number, col: number) {
		if (grid[row][col] === color) {
			return;
		}

		head = {
			data: { type: toolType, row, column: col, color },
			timestamp: new Date(),
			parent: head
		};
	}

	function reset() {
		head = undefined;
		historyComponent.reset();
	}
</script>

<button id="reset" onclick={reset}> Reset </button>
<div id="main">
	<Grid {grid} {onClick} --size="30px" />
</div>

<ToolPicker bind:toolType />
<ColorPicker bind:color />

<History
	bind:this={historyComponent}
	heads={[head!]}
	onClick={(item) => {
		head = item;
	}}
	onHover={(item) => {
		previewHead = item;
	}}
/>

<style>
	#main {
		padding: 10px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: var(--background-code);

		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
	}

	#reset {
		width: fit-content;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
