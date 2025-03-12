<script>
	import Emoji from '$lib/emoji.svelte';
	import Fa from 'svelte-fa';
	import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
</script>

<footer>
	<div>
		<p>
			Made with <Emoji /> by <b>Graic</b>
		</p>
		&nbsp; &nbsp;
		<a href="/rss.xml"> <Fa icon={faRssSquare} size="lg" /></a>
	</div>
</footer>

<style>
	footer {
		/* width: 100%; */

		margin-top: auto;
		padding: 10px;

		margin: 0 auto;
		margin-top: auto;
	}

	div {
		padding: 10px;

		display: flex;
		align-items: center;
	}

	div {
		background-color: var(--background-secondary);
		border-radius: calc(infinity * 1px);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
