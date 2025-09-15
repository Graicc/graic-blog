<script>
	import Emoji from '$lib/emoji.svelte';
	import Fa from 'svelte-fa';
	import { faRssSquare } from '@fortawesome/free-solid-svg-icons';
</script>

<footer>
	<div class="webring love">
		<div>
			<a href="https://ochowebr.ing">Ocho Webring</a>
		</div>
		<div>
			<a href="https://callan101.com/">Prev</a>
			|
			<a href="https://ochowebr.ing/random">Random</a>
			|
			<a href="https://qlyoung.net/">Next</a>
		</div>
	</div>

	<div class="love">
		<p>
			Made with <Emoji /> by <b>Graic</b>
		</p>
		&nbsp;
		<a href="/rss.xml"> <Fa icon={faRssSquare} size="lg" /></a>
	</div>
</footer>

<style>
	.webring {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 20px !important;
	}

	.webring div {
		display: block;
	}

	footer {
		/* width: 100%; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;

		margin-top: auto;
		padding: 10px;

		margin: 0 auto;
		margin-top: auto;
	}

	.love {
		padding: 10px;

		display: flex;
		align-items: center;
		width: fit-content;
	}

	.love {
		background-color: var(--background-secondary);
		border-radius: calc(infinity * 1px);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
