<script lang="ts">
	const uid = $props.id();
	let { children, word }: { children: any; word: string } = $props();
</script>

<span class="outer">
	<input type="checkbox" id="{uid}-footnote" />
	<label for="{uid}-footnote">
		{word} <span class="raise">†</span><span id="slot">
			[{@render children?.()}]
		</span>
	</label>
</span>

<style>
	.outer {
		background-color: light-dark(var(--accent-lighter), var(--accent-darker));
		padding: 0.2em;
		border-radius: 6px;
	}
	*:hover {
		cursor: help;
	}
	.raise {
		vertical-align: top;
		font-size: 0.7em;
		font-weight: 900;
	}
	input {
		display: none;
	}
	input:not(:checked) ~ label > span#slot {
		display: none;
	}
	input:checked ~ label > span#slot {
		margin-left: 4px;
	}
</style>
