<script>
	import './style.css';
	import '$lib/logo.svelte';
	import Emoji from '$lib/emoji.svelte';
	import Header from '$lib/header.svelte';

	export const prerender = true;
</script>

<Header />

<slot></slot>

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

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
