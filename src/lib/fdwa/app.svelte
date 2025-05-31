<script lang="ts">
	import ColorPicker from './colorPicker.svelte';
	import Grid from './grid.svelte';
	import History from './history.svelte';
	import { BLACK, merge, reducer, treeReduce, isEqual, WHITE } from './lib.svelte';
	import ToolPicker from './toolPicker.svelte';
	import type { NetworkPacket, State, Transaction, TransactionData } from './types';
	import * as devalue from 'devalue';

	import { state } from './state.svelte';
	import Network from './network.svelte';
	// let transactions: Array<TransactionData> = $state([]);

	let itemsToShow: {
		reset: boolean | undefined;
		grid: boolean | undefined;
		gridLocked: boolean | undefined;
		toolPicker: boolean | undefined;
		colorPicker: boolean | undefined;
		history: boolean | undefined;
		undoButton: boolean | undefined;
		network: boolean | undefined;
	} = $props();

	let historyComponent: History;

	let networkComponent: Network;

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

	let isNetworking = false;
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

		// let nextState = structuredClone($state.snapshot(originalState));

		if (!isNetworking) {
			let packet: NetworkPacket = {
				head: state.head
			};
			networkComponent.send(packet);
		}
	}

	function onRecieve(data: NetworkPacket) {
		isNetworking = true;
		if (state.head) {
			doMerge(state.head, data.head);
		} else {
			setHead(data.head);
		}
		isNetworking = false;
	}

	function onOpen(isHost: boolean) {
		if (isHost && state.head) {
			networkComponent.send({ head: state.head });
		}
	}

	function doMerge(destination: Transaction, source: Transaction) {
		// remove destination and source from the list of heads
		state.heads = state.heads.filter(
			(head) => !(isEqual(head, destination) || isEqual(head, source))
		);
		if (!isNetworking) {
			historyComponent.reset();
		}
		setHead(merge(destination, source));
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
		onMerge={doMerge}
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

{#if itemsToShow.network}
	<Network bind:this={networkComponent} {onRecieve} {onOpen} />
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
