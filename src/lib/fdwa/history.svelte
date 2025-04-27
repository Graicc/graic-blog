<script lang="ts">
	import Grid from './grid.svelte';
	import { reduce, treeReduce } from './lib.svelte';
	import type { Transaction } from './types';

	let { heads, onClick }: { heads: Array<Transaction>; onClick: (item: Transaction) => void } =
		$props();

	let head = $derived(heads[0]);

	type Node = {
		x: number;
		y: number;
		transaction: Transaction;
	};

	function getNodes(head: Transaction | undefined): Array<Node> {
		if (head === undefined) {
			return [];
		}

		let upstream = getNodes(head.parent);

		let lastX = upstream.at(-1)?.x ?? 0;
		let lastY = upstream.at(-1)?.y ?? 100;
		let lastTimestamp = head.parent?.timestamp ?? head.timestamp;

		let deltaTMs = head.timestamp.getTime() - lastTimestamp.getTime();
		let newX = lastX + Math.min(deltaTMs / 10, 100);

		console.log(newX);
		return [...upstream, { x: newX, y: lastY, transaction: head }];
	}

	let nodes = $derived(getNodes(head));
</script>

<div class="container">
	{#each nodes as { x, y, transaction }}
		<div
			class="node"
			style="left: {x}px; top: {y}px;"
			onclick={() => {
				onClick(transaction);
			}}
			role="button"
		>
			<Grid grid={treeReduce(transaction, reduce)} --size="4px" />
		</div>
	{/each}
</div>

<style>
	.container {
		position: relative;
		width: 800px;
		height: 200px;
		background: #fff;
		overflow-x: scroll;
	}

	.node {
		position: absolute;
		width: 40px;
		height: 40px;
		border: 2px solid white;
		border-radius: 5px;
		background: white;
		transform: translate(-50%, -50%); /* center the circle */
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.edge {
		position: absolute;
		background: black;
		transform-origin: 0 50%;
		height: 2px;
	}
</style>
