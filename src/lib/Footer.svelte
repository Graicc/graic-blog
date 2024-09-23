<script>
	import Emoji from '$lib/emoji.svelte';
	import Fa from 'svelte-fa';
	import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
</script>

<footer>
	<p>
		Made with <Emoji /> by <b>Graic</b>
	</p>
	&nbsp; &nbsp;
	<a href="/rss.xml"> <Fa icon={faRssSquare} size="lg" /></a>
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
