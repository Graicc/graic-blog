<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import Grid from './grid.svelte';
	import { merge, reducer, treeReduce } from './lib.svelte';
	import type { Transaction } from './types';

	let {
		heads,
		onClick,
		onHover,
		onMerge
	}: {
		heads: Array<Transaction>;
		onClick: (item: Transaction) => void;
		onHover: (item: Transaction | undefined) => void;
		onMerge: (destination: Transaction, source: Transaction) => void;
	} = $props();

	type Node = {
		x: number;
		y: number;
		childrenCount: number;
	};

	let numBranches = $state(1);

	export function reset() {
		nodes.clear();
		numBranches = 1;
	}

	let selectedTransaction: Transaction | undefined = $state();

	let nodes: Map<Transaction, Node> = new SvelteMap();

	// TODO: handle merges correctly (adjust the y offsets)
	function getNode(transaction: Transaction | undefined): Node {
		if (transaction === undefined) {
			return {
				x: 50,
				y: 50,
				childrenCount: 0
			};
		}

		let cached = nodes.get(transaction);
		if (cached) {
			return cached;
		}

		let parent = getNode(transaction.parent);

		let lastTimestamp = transaction.parent?.timestamp ?? transaction.timestamp;
		let deltaTMs = transaction.timestamp.getTime() - lastTimestamp.getTime();
		let newX = parent.x + Math.min(deltaTMs / 10, 50);

		let newY = parent.y;
		if (parent.childrenCount > 0) {
			newY = 50 + numBranches * 50;
			numBranches++;
		}

		let node: Node = {
			x: newX,
			// y: parent.y + parent.childrenCount * 50,
			y: newY,
			childrenCount: 0
		};
		parent.childrenCount += 1;

		nodes.set(transaction, node);

		return node;
	}

	function getClosureOfNode(transaction: Transaction | undefined): Set<[Transaction, Node]> {
		if (transaction === undefined) {
			return new Set();
		}

		let parent = getClosureOfNode(transaction.parent);
		// let node = getNode(transaction);
		let node = nodes.get(transaction);
		// This should never be hit
		if (!node) {
			return parent;
		}

		parent.add([transaction, node]);
		return parent;
	}

	// Populate cache
	$effect(() => {
		heads.map(getNode);
	});

	let headsNodes = $derived(heads.map(getClosureOfNode).reduce((l, r) => l.union(r), new Set()));

	function edgeStyle(start: { x: number; y: number }, end: { x: number; y: number }): string {
		return `
			left: ${start.x}px;
			top: ${start.y}px;
			width: ${Math.hypot(end.x - start.x, end.y - start.y)}px;
			transform: rotate(${Math.atan2(end.y - start.y, end.x - start.x)}rad);
		`;
	}

	let edges = $derived(
		headsNodes.values().map(([transaction, node]) => {
			const parent = getNode(transaction.parent);
			return edgeStyle(parent, node);
		})
	);

	let mousePos: { x: number; y: number } = $state({ x: 0, y: 0 });

	let containerElement: HTMLDivElement;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="container"
	style:height="{50 + 50 * numBranches}px"
	bind:this={containerElement}
	onmouseleave={() => {
		onHover(undefined);
	}}
	onmouseup={(e) => {
		if (e.button != 2) {
			return;
		}
		selectedTransaction = undefined;
		e.preventDefault();
	}}
	oncontextmenu={(e) => e.preventDefault()}
	onmousemove={(e) => {
		const rect = containerElement.getBoundingClientRect();
		let x = e.clientX - rect.left + containerElement.scrollLeft;
		let y = e.clientY - rect.top + containerElement.scrollTop;
		mousePos = { x, y };
	}}
>
	{#each edges as edge}
		<div class="edge" style={edge}></div>
	{/each}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	{#each headsNodes as [transaction, { x, y }]}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={['node', heads.includes(transaction) ? 'current' : '']}
			style="left: {x}px; top: {y}px;"
			onclick={() => {
				onClick(transaction);
			}}
			onmousedown={(e) => {
				if (e.button != 2) {
					return;
				}
				selectedTransaction = transaction;
				e.preventDefault();
			}}
			onmouseup={(e) => {
				if (e.button != 2) {
					return;
				}
				if (selectedTransaction) {
					onMerge(transaction, selectedTransaction);
				}
			}}
			onmouseenter={() => {
				if (selectedTransaction) {
					onHover(merge(transaction, selectedTransaction));
				} else {
					onHover(transaction);
				}
			}}
		>
			<Grid grid={treeReduce(transaction, reducer)} --size="4px" />
		</div>
	{/each}

	{#if selectedTransaction}
		<div class="edge" style={edgeStyle(getNode(selectedTransaction), mousePos)}></div>
	{/if}
</div>

<style>
	.container {
		position: relative;
		/* width: 800px; */
		max-width: var(--content-width-wide);
		/* height: 200px; */
		/* height: fit-content; */
		background: var(--background-code);
		border-radius: 5px;
		/* overflow-x: scroll; */
		overflow-x: auto;
	}

	.node {
		position: absolute;
		width: 40px;
		height: 40px;
		border: 2px solid var(--accent-lighter);
		border-radius: 5px;
		background: white;
		transform: translate(-50%, -50%); /* center the circle */
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.node:hover {
		z-index: 9;
		box-shadow: 0 0 5px 5px var(--accent-lighter);
	}

	.current {
		box-shadow: 0 0 2px 2px var(--accent-lighter);
	}

	.edge {
		position: absolute;
		background: black;
		transform-origin: 0 50%;
		height: 2px;
	}
</style>
