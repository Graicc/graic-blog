<script>
	let { toolType = $bindable() } = $props();

	let tools = ['set', 'fill'];
</script>

<div id="main">
	{#each tools as tool}
		<button
			class="color {toolType === tool ? 'selected' : ''}"
			onclick={() => {
				toolType = tool;
			}}
		>
			{tool}
		</button>
	{/each}
</div>

<style>
	#main {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 10px;
		margin: 10px;
	}

	.tool {
		width: 40px;
		height: 40px;
		border-radius: 10%;
		outline: 2px solid white;
	}

	.selected {
		box-shadow: 0 0 5px 5px var(--accent-lighter);
	}
</style>
