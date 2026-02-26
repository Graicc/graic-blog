<script lang="ts">
	let props: {
		href: string;
	} = $props();
</script>

<div>
	<a href={props.href} rel="noopener noreferrer" class="big-link">
		<slot />
	</a>
</div>

<style>
	div {
		/* margin-top: 10px; */
		margin-bottom: 20px;
	}

	a {
		text-decoration: none;
		/* color: inherit; */
	}

	.big-link {
		background-color: var(--background-secondary);
		border-radius: calc(infinity * 1px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		width: fit-content;
		display: inline-block;
		padding: 5px 10px;
	}
</style>
