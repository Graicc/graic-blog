<div class="logo">
	<div class="l1">
		<svg viewBox="-1 -1 22 52">
			<line
				x1="20"
				y1="0"
				x2="20"
				y2="40"
				stroke-width="1.5"
				stroke="rgb(0,0,0)"
				stroke-linecap="round"
			/>
		</svg>
	</div>
	<div class="l2">
		<svg viewBox="-1 -1 22 52">
			<line
				x1="2.92893218813"
				y1="32.9289321881"
				x2="17.0710678119"
				y2="17.0710678119"
				stroke-width="1.5"
				stroke="rgb(0,0,0)"
			>
			</line></svg
		>
	</div>
	<div class="l3">
		<svg viewBox="-1 -1 22 52">
			<circle cx="10" cy="10" r="10" fill="none" stroke-width="1.5" stroke="rgb(0,0,0)" />
		</svg>
	</div>
	<div class="l4">
		<svg viewBox="-1 -1 22 52">
			<circle cx="10" cy="40" r="10" fill="none" stroke-width="1.5" stroke="rgb(0,0,0)" />
		</svg>
	</div>
</div>

<style>
	/* TODO: make work with light mode */
	* {
		stroke-width: 2;
		stroke: light-dark(black, white);
		overflow: visible;
	}

	.logo {
		--size: 60px;

		height: var(--size);
		width: var(--size);
	}

	.logo * {
		margin-bottom: calc(-1 * var(--size));
	}

	svg {
		padding-left: 25%;
		height: var(--size);
	}

	.l1 {
		animation: animate-l1 0.5s ease-in forwards;
		stroke-dasharray: 40;
		stroke-dashoffset: 40;
	}
	@keyframes animate-l1 {
		0% {
			stroke-dashoffset: 40;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	.l3 {
		animation: animate-c1 0.725s ease-out forwards;
		stroke-dasharray: 62.8318530718;
		stroke-dashoffset: 62.8318530718;
	}
	@keyframes animate-c1 {
		31% {
			stroke-dashoffset: 62.8318530718;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	.l4 {
		animation: animate-c2 1s ease-out forwards;
		stroke-dasharray: 62.8318530718;
		stroke-dashoffset: 62.8318530718;
	}
	@keyframes animate-c2 {
		50% {
			stroke-dashoffset: 62.8318530718;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	.l2 {
		animation: animate-l2 1s ease-out forwards;
		stroke-dasharray: 40;
		stroke-dashoffset: 40;
	}
	@keyframes animate-l2 {
		72.5% {
			stroke-dashoffset: 40;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
</style>
