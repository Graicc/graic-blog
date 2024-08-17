<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { Post } from '$lib/types';

	export let data;
</script>

<article>
	<h1>Hi, I'm <em>Graic</em></h1>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ipsam corrupti doloribus
		natus soluta qui magni debitis. Modi saepe earum odio provident cupiditate commodi. Saepe, nam
		illo. Laudantium, optio sit.
	</p>

	<br />

	<hr />

	{#each data.posts as post}
		{#if post}
			{#if post.title}
				<br />
				<div class="wide">
					<a href={`p/${post.uri}`}>
						<h1>{post.title}</h1>
					</a>
					<h3>{post.subtitle}</h3>
					<sub>{formatDate(new Date(post.date))}</sub>
				</div>
			{/if}
		{/if}
	{/each}
</article>

<style>
	article > h1 {
		font-size: 3rem;
	}

	em {
		color: var(--link-color);
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
