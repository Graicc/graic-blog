<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import Grid from './grid.svelte';
	import { reducer, treeReduce } from './lib.svelte';
	import type { Transaction } from './types';

	let {
		heads,
		onClick,
		onHover
	}: {
		heads: Array<Transaction>;
		onClick: (item: Transaction) => void;
		onHover: (item: Transaction | undefined) => void;
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

	let nodes: Map<Transaction, Node> = new SvelteMap();

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

	$effect(() => {
		heads.map(getNode);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="container"
	style:height="{50 + 50 * numBranches}px"
	onmouseleave={() => {
		onHover(undefined);
	}}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	{#each nodes as [transaction, { x, y }]}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#if transaction.parent}
			<div
				class="edge"
				style="
					left: {getNode(transaction.parent).x}px;
					top: {getNode(transaction.parent).y}px;
					width: {Math.hypot(x - getNode(transaction.parent).x, y - getNode(transaction.parent).y)}px;
					transform: rotate({Math.atan2(
					y - getNode(transaction.parent).y,
					x - getNode(transaction.parent).x
				)}rad)
				"
			></div>
		{/if}
		<div
			class={['node', heads.includes(transaction) ? 'current' : '']}
			style="left: {x}px; top: {y}px;"
			onclick={() => {
				onClick(transaction);
			}}
			onmouseenter={() => {
				onHover(transaction);
			}}
		>
			<Grid grid={treeReduce(transaction, reducer)} --size="4px" />
		</div>
	{/each}
</div>

<style>
	.container {
		position: relative;
		width: 800px;
		/* height: 200px; */
		/* height: fit-content; */
		background: var(--background-code);
		border-radius: 5px;
		overflow-x: scroll;
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
		z-index: 1;
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
		z-index: 0;
	}
</style>
