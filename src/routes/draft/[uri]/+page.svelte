<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.subtitle} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://graic.net/draft/${data.uri}`} />
	<meta property="og:image" content="https://graic.net/favicon.png" />
</svelte:head>

<svelte:component this={data.content} />
