<script>
	import Logo from './logo.svelte';
</script>

<header>
	<nav>
		<span>
			<a href="/" class="logo">
				<Logo />
			</a>

			<div class="mobile-menu">
				<input type="checkbox" id="menu-btn" />
				<label for="menu-btn" class="open">≡</label>
				<label for="menu-btn" class="close">✖</label>
			</div>
		</span>

		<a href="/">Home</a>
		<a href="/">Blog</a>
		<a href="https://prints.graic.net">Prints</a>
		<a href="https://github.com/Graicc">GitHub</a>
	</nav>
</header>

<style>
	header {
		background-color: var(--background-secondary);
		width: 100%;
		margin-bottom: 10px;

		font-size: 1.35em;
	}

	nav {
		max-width: var(--content-width);
		margin: 10px auto;
		padding: 0 10px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	nav > :first-child {
		margin-right: auto;
	}

	@media (max-width: 600px) {
		nav {
			flex-direction: column;
			align-items: baseline;
		}

		nav > :first-child {
			width: 100%;

			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.mobile-menu {
			margin-right: 20px;
		}

		nav > a {
			margin-left: 10px;
		}

		input {
			display: none;
		}
		label {
			font-size: 1.2em;
			font-weight: bold;
			cursor: pointer;
		}

		input ~ label.open {
			display: inline;
		}
		input ~ label.close {
			display: none;
		}
		input:checked ~ label.open {
			display: none;
		}
		input:checked ~ label.close {
			display: inline;
		}

		nav:has(input:not(:checked)) a:not(:first-child) {
			display: none;
		}
	}

	@media (min-width: 600px) {
		.mobile-menu {
			display: none;
		}
	}
</style>
