<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<!-- <meta name="description" content="TODO" /> -->
</svelte:head>

<svelte:component this={data.content} />
