<script lang="ts">
	import ColorPicker from './colorPicker.svelte';
	import Grid from './grid.svelte';
	import History from './history.svelte';
	import { BLACK, merge, reducer, treeReduce, WHITE } from './lib.svelte';
	import ToolPicker from './toolPicker.svelte';
	import type { State, Transaction, TransactionData } from './types';

	import { state } from './state.svelte';
	// let transactions: Array<TransactionData> = $state([]);

	let itemsToShow: {
		reset: boolean | undefined;
		grid: boolean | undefined;
		gridLocked: boolean | undefined;
		toolPicker: boolean | undefined;
		colorPicker: boolean | undefined;
		history: boolean | undefined;
		undoButton: boolean | undefined;
	} = $props();

	let historyComponent: History;

	// let grid = $derived(transactions.reduce(reduce, initialState));
	let grid = $derived(treeReduce(state.previewHead ?? state.head, reducer));
	// let grid = $derived(treeReduce(head, reducer));

	function onClick(row: number, col: number) {
		if (grid[row][col] === state.color) {
			return;
		}

		setHead({
			data: { type: state.toolType, row, column: col, color: state.color },
			timestamp: new Date(),
			parent: state.head
		});
	}

	function setHead(newHead: Transaction) {
		state.head = newHead;

		// Todo: handle the case where you select a state in the past (this shouldn't create a new head)

		if (state.heads.length == 0) {
			state.heads = [state.head];
			return;
		}

		if (state.heads.includes(newHead)) {
			return;
		}

		let index = state.heads.indexOf(newHead.parent!);
		if (index !== -1) {
			state.heads[index] = state.head;
		} else {
			state.heads.push(state.head);
		}
	}

	function reset() {
		state.head = undefined;
		state.heads = [];
		historyComponent.reset();
	}
</script>

{#if itemsToShow.reset}
	<button id="reset" onclick={reset}> Reset </button>
{/if}

{#if itemsToShow.grid}
	<div id="main">
		{#if itemsToShow.gridLocked}
			<Grid {grid} onClick={() => {}} --size="30px" />
		{:else}
			<Grid {grid} {onClick} --size="30px" />
		{/if}
	</div>
{/if}

{#if itemsToShow.toolPicker}
	<ToolPicker bind:toolType={state.toolType} />
{/if}
{#if itemsToShow.colorPicker}
	<ColorPicker bind:color={state.color} />
{/if}

{#if itemsToShow.history}
	<History
		bind:this={historyComponent}
		heads={state.heads}
		onClick={(item) => {
			setHead(item);
		}}
		onHover={(item) => {
			state.previewHead = item;
		}}
		onMerge={(destination, source) => {
			// remove destination and source from the list of heads
			let index = state.heads.indexOf(destination);
			if (index !== -1) {
				state.heads.splice(index, 1);
			}
			index = state.heads.indexOf(source);
			if (index !== -1) {
				state.heads.splice(index, 1);
			}
			historyComponent.reset();
			setHead(merge(destination, source));
		}}
	/>
{/if}

{#if itemsToShow.undoButton}
	<button
		onclick={() => {
			if (state.head) {
				state.head = state.head.parent;
			}
		}}
	>
		Undo
	</button>
{/if}

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
		margin-top: 10px;
		margin-bottom: 10px;
	}

	button {
		width: fit-content;
	}
</style>
