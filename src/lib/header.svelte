<script>
	import Logo from './logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
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
		<a href="https://prints.graic.net">Prints</a>
		<a href="https://github.com/Graicc">GitHub</a>
		<span id="toggle"><ThemeToggle /></span>
	</nav>
</header>

<style>
	header {
		width: 100%;
		margin-bottom: 50px;

		font-size: 1.35em;
	}

	nav {
		max-width: var(--content-width);
		background-color: var(--background-secondary);
		margin: 10px auto;
		padding: 10px;
		border-radius: calc(min(infinity * 1px, 40px));
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);

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
		nav:has(input:not(:checked)) #toggle {
			display: none;
		}
	}

	@media (min-width: 600px) {
		.mobile-menu {
			display: none;
		}
	}
</style>
