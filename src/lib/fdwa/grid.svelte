<script lang="ts">
	import Box from './box.svelte';

	let { grid, onClick = () => {} } = $props();
</script>

<div class="outer">
	{#each grid as row, rowIndex}
		{#each row as item, colIndex}
			<div class="box" role="button" onmousedown={() => onClick(rowIndex, colIndex)}>
				<Box --color={item} />
			</div>
		{/each}
	{/each}
</div>

<style>
	.outer {
		display: grid;
		/* gap: 2px; */
		grid-template-columns: repeat(10, var(--size));
	}

	.box {
		width: var(--size);
		height: var(--size);
		background-color: red;
	}
</style>
