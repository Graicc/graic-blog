<script lang="ts">
	import Grid from './grid.svelte';
	import History from './history.svelte';
	import { BLACK, reduce, treeReduce, WHITE } from './lib.svelte.ts';
	import Test from './test.svelte';
	import type { State, Transaction, TransactionData } from './types';

	// let transactions: Array<TransactionData> = $state([]);
	let head: Transaction = $state({
		data: { type: 'clear' },
		timestamp: new Date(),
		parent: undefined
	});

	// let grid = $derived(transactions.reduce(reduce, initialState));
	let grid = $derived(treeReduce(head, reduce));

	function onClick(row: number, col: number) {
		let nextColor = grid[row][col] == BLACK ? WHITE : BLACK;
		nextColor = WHITE;
		// transactions.push({ type: 'set', row, column: col, color: nextColor });
		head = {
			data: { type: 'set', row, column: col, color: nextColor },
			timestamp: new Date(),
			parent: head
		};
	}

	function onHistory(item: Transaction) {
		head = item;
	}
</script>

<div id="main">
	<Grid {grid} {onClick} --size="30px" />
</div>

<button
	onclick={() => {
		head = {
			data: { type: 'clear' },
			timestamp: new Date(),
			parent: head
		};
	}}
>
	Reset
</button>

<History heads={[head]} onClick={onHistory} />

<!-- <div id="history">
	{#each transactions as transaction, i}
		{#if i !== 0}
			<div class="line"></div>
		{/if}
		<div class="circle">
			<Grid
				grid={transactions.slice(0, i + 1).reduce(reduce, initialState)}
				{onClick}
				--size="4px"
			/>
		</div>
	{/each}
</div> -->

<!-- <Test /> -->

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

	#history {
		display: flex;
		align-items: center;
		font-family: monospace;
		overflow-x: scroll;

		padding: 10px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: var(--background-code);
	}

	.circle {
		padding: 1px;
		margin: 0 4px;
	}

	.line {
		height: 2px;
		background-color: black;
		flex: 1;
		margin: 0 2px;
		max-width: 5px;
	}

	#history {
	}
</style>
