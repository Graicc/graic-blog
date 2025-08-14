<script>
	export let quote;
	export let author;
</script>

<div id="quote-outer">
	<p id="quote">
		{@html quote}
	</p>
	<div>
		&mdash;
		<strong> {author}</strong>
	</div>
</div>

<style>
	#quote-outer {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: var(--background-code);
		color: var(--text-color-secondary);
		padding: 20px;
		border-radius: 20px;
	}

	p#quote {
		margin-bottom: 0;
	}

	div div {
		font-weight: bold;
		text-align: right;
	}
</style>
