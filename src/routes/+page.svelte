<script lang="ts">
	import { formatDate } from '$lib/format';
	import Quote from '$lib/Quote.svelte';
	import type { Post } from '$lib/types';

	export let data;
</script>

<article>
	<div id="intro">
		<h1>Hi, I'm <em>Graic</em></h1>
		<div><Quote /></div>
	</div>
	<!-- <p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ipsam corrupti doloribus
		natus soluta qui magni debitis. Modi saepe earum odio provident cupiditate commodi. Saepe, nam
		illo. Laudantium, optio sit.
	</p> -->

	<br />

	<hr />

	{#each data.posts as post}
		{#if post}
			{#if post.title}
				<br />
				<div class="wide">
					<sub>{formatDate(new Date(post.date))}</sub>
					<a href={`p/${post.uri}`}>
						<h1>{post.title}</h1>
					</a>
					<h3>{post.subtitle}</h3>
				</div>
			{/if}
		{/if}
	{/each}
</article>

<style>
	#intro {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		align-items: flex-start;
		gap: 10px;
	}

	#intro > h1 {
		/* width: 100%; */
		font-size: 3rem;
		line-height: 1;
		/* flex-grow: 1; */
		flex: 1 1 30%;
		min-width: 160px;
	}

	#intro > div {
		flex: 2 1 60%;
	}

	em {
		color: var(--accent-color);
		font-weight: bold;
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

	br {
		margin: 20px 0;
	}
</style>
