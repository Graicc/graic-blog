<script>
	import { formatDate } from '$lib/format';

	export let title;
	export let subtitle;
	export let date;

	let formattedDate = formatDate(new Date(date));
</script>

<article>
	<div class="spacer"></div>
	{#if title}
		<sub>{formattedDate}</sub>
		<h1>{title}</h1>
		<h3>{subtitle}</h3>

		<hr />
	{/if}
	<!-- <h1>asdf</h1> -->

	<slot></slot>
</article>

<style>
	article .spacer {
		margin-top: 50px;
	}

	article h3 {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	article hr {
		/* width: 900px;
		max-width: var(--content-width-wide); */
		color: var(--text-color);
		margin: 10px 0;
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	article > :global(*) {
		width: 100%;
		padding: 0 10px;
		max-width: var(--content-width);
	}

	article :global(h1) {
		font-size: 3rem;
		line-height: 1.1;
		max-width: var(--content-width);
	}

	article :global(p) {
		margin-bottom: 1.5em;
		/* text-align: justify; */
	}

	article :global(p:has(img)) {
		max-width: var(--content-width-wide);
		padding: 0;
		align-items: center;
	}

	article :global(pre:has(code)) {
		margin-bottom: 1.5em;
		max-width: calc(var(--content-width) + 20px);
		border: 1px solid var(--border-code);
		border-radius: 20px;
		padding: 20px;

		display: flex;
		justify-content: left;
		align-items: center;
	}

	article :global(ul li) {
		list-style-position: inside;
	}

	article :global(p code) {
		border: 1px solid var(--border-code);
		background-color: var(--background-code);
		color: var(--text-color-secondary);
		padding: 3px;
		border-radius: 6px;
	}
</style>
