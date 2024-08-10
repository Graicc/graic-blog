<script>
	export let title;
	export let date;

	function formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	let formattedDate = formatDate(new Date(date));
</script>

<article>
	{#if title}
		<h1>{title}</h1>
		<sub>{formattedDate}</sub>
	{/if}
	<!-- <h1>asdf</h1> -->

	<slot></slot>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 10px;
	}

	article :global(*) {
		width: 100%;
		max-width: var(--content-width);
	}

	article :global(h1) {
		font-size: 4rem;
		line-height: 1;
		max-width: var(--content-width);
	}

	article :global(p) {
		margin-bottom: 1.5em;
		/* text-align: justify; */
	}

	article :global(p:has(img)) {
		max-width: var(--content-width-wide);
		align-items: center;
	}
	article :global(p img) {
		max-width: var(--content-width-wide);
	}

	article :global(pre:has(code)) {
		max-width: var(--content-width-wide);
		border: 2px solid white;
		border-radius: 20px;
		padding: 20px;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	article :global(pre code) {
		max-width: var(--content-width);
	}
</style>
