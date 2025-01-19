<script>
	function getIsDark() {
		var theme = 'light';

		if (localStorage.getItem('theme')) {
			if (localStorage.getItem('theme') == 'dark') {
				var theme = 'dark';
			}
		} else if (!window.matchMedia) {
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			var theme = 'dark';
		}

		return theme == 'dark';
	}

	let isDark = false;
	import { onMount } from 'svelte';
	onMount(() => {
		isDark = getIsDark();
	});

	function onClick() {
		if (getIsDark()) {
			localStorage.setItem('theme', 'light');
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		isDark = getIsDark();
	}
</script>

<button on:click={onClick} title="Toggle color theme">
	<svg width="36px," height="36px">
		<g>
			<ellipse style="fill:none;stroke-width:4;" cx="18" cy="18" rx="16" ry="16" />
			<path style="fill-opacity:1" d="M 18,4 A 16 16 0 0 1 34,18 16 16 0 0 1 18,34" />
		</g>
	</svg>
</button>

<style>
	button {
		background: none;
		border: none;
		width: 36px;
		height: 36px;
		padding: 0;
		transform: scale(0.7) translate(0, 5px);
	}

	* {
		stroke: light-dark(var(--text-color), white);
		fill: light-dark(var(--text-color), white);
	}
	button:hover {
		cursor: pointer;
	}
</style>
