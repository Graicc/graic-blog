<script>
	import './style.css';
	import '$lib/logo.svelte';
	import Logo from '$lib/logo.svelte';
	import Emoji from '$lib/emoji.svelte';

	export const prerender = true;
</script>

<header>
	<a href="/" class="logo">
		<Logo />
	</a>
	<nav>
		<a href="/">Home</a>
		<a href="https://github.com/Graicc">Github</a>
	</nav>
</header>

<slot></slot>

<footer>
	<p>
		Made with <Emoji /> by <b>Graic</b>
	</p>
</footer>

<style>
	header {
		width: 100%;
		max-width: var(--content-width);
		margin: 10px auto;
		margin-bottom: 50px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	header nav {
		padding-right: 10px;
	}
	header nav * {
		margin-left: 10px;
	}

	footer {
		width: 100%;
		max-width: var(--content-width-wide);
		margin: auto auto 0 auto;

		padding: 10px 10px 0 10px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
