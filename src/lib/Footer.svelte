<script>
	import Emoji from '$lib/emoji.svelte';
</script>

<footer>
	<p>
		Made with <Emoji /> by <b>Graic</b>
	</p>
</footer>

<style>
	footer {
		background-color: var(--background-secondary);
		width: 100%;

		margin-top: auto;
		padding-top: 1em;
		padding-bottom: 1em;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
