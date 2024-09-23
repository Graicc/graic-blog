<script>
	import './style.css';
	import './prism-vsc-dark-plus.css';

	import Header from '$lib/header.svelte';
	import Footer from '../lib/Footer.svelte';

	export const prerender = true;
</script>

<svelte:head>
	<title>Graic Blog</title>
</svelte:head>

<Header />

<slot></slot>

<div class="half-height"></div>
<Footer />

<style>
	.half-height {
		height: 25vh;
	}
</style>
