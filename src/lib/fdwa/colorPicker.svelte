<script>
	import { BLACK, BLUE, GREEN, RED, WHITE } from './lib.svelte';

	let colors = [BLACK, WHITE, RED, GREEN, BLUE];

	let { color = $bindable() } = $props();
</script>

<div id="main">
	{#each colors as c}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div
			class="color {color === c ? 'selected' : ''}"
			aria-label="color"
			onclick={() => {
				color = c;
			}}
			style:background-color={c}
		/>
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

	.color {
		width: 40px;
		height: 40px;
		border-radius: 10%;
		outline: 2px solid white;
	}

	.selected {
		box-shadow: 0 0 5px 5px var(--accent-lighter);
	}
</style>
