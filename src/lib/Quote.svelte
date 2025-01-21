<script>
	import { onMount } from 'svelte';
	const quotes = [
		[
			'Far better it is to <em>dare mighty things</em>, to win glorious triumphs, even though checkered by failure, than to rank with those poor spirits who neither enjoy nor suffer much, because they live in the gray twilight that knows not victory nor defeat.',
			'Teddy Roosevelt'
		],
		[
			"The road to wisdom? - Well, it's plain<br /> and simple to express:<br /> Err<br /> and err<br /> and err again<br /> but less<br /> and less<br /> and less.",
			'Piet Hein'
		],
		[
			"<a href='https://xkcd.com/893/'>The universe is probably littered with the one-planet graves of cultures which made the sensible economic decision that there's no good reason to go into space--each discovered, studied, and remembered by the ones who made the irrational decision.</a>",
			'Randal Monroe'
		],
		['Memento mori &mdash; Remember you must die.', 'Unknown'],
		['When a measure becomes a target, it ceases to be a good measure.', 'Charles Goodhart'],
		['The best way to predict the future is to create it.', 'Peter Drucker'],
		[
			'The competent programmer is fully aware of the limited size of his own skull. He therefore approaches his task with full humility, and avoids clever tricks like the plague.',
			'Edsger Dijkstra'
		],
		['Mathematics is the art of giving the same name to different things.', 'Henri Poincare'],
		[
			'We act as though comfort and luxury were the chief requirements of life, when all that we need to make us happy is something to be enthusiastic about.',
			'Charles Kinglsey'
		],
		['I must obey the inscrutable exhortations of my soul.', 'Calvin and Hobbes'],
		['Perfect is the enemy of good', 'Voltaire'],
		[
			'We are the sum of our actions, and therefore our habits make all the difference.',
			'Aristotle'
		],
		[
			'If you wish to make an apple pie from scratch, you must first invent the universe.',
			'Carl Segan'
		],
		[
			'If you would not be forgotten, as soon as you are dead and rotten, either write things worth reading, or do things worth writing.',
			'Benjamin Franklin'
		],
		['Any sufficiently advanced technology is indistinguishable from magic.', 'Arthur C. Clarke'],
		[
			"I don't know anything with certainty, but seeing the stars makes me dream.",
			'Vincent Van Gogh'
		],
		['Somewhere, something incredible is waiting to be known.', 'Sharon Begley'],
		['Per aspera ad astra &mdash; Through hardships to the stars.', 'Voyager 1'],
		[
			"<a href='https://xkcd.com/267/'>You're curious and smart and bored, and all you see is the choice between working hard and slacking off. There are so many adventures that you miss because you're waiting to think of a plan. To find them, look for tiny interesting choices. And remember that you are always making up the future as you go.</a>",
			'Randal Monroe'
		],
		['Errare humanum est &mdash; To err is human.', 'Unknown'],
		[
			'The assumption that what currently exists must necessarily exist is the acid that corrodes all visionary thinking.',
			'Murray Bookchin'
		],
		[
			'The best time to plant a tree was 20 years ago. The second best time is now.',
			'Chinese Proverb'
		],
		['How we spend our days is, of course, how we spend our lives.', 'Annie Dillard'],
		['Well behaved women seldom ever make history.', 'Laurel Thatcher Ulrich'],
		['The Universe is under no obligation to make sense to you.', 'Neil deGrasse Tyson'],
		[
			'We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard; because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one we intend to win',
			'John F. Kennedy'
		],
		[
			'<a href="https://en.wikipedia.org/wiki/Do_not_go_gentle_into_that_good_night">Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.</a>',
			'Dylan Thomas'
		]
	];

	let index = 0;
	/**
	 * @param {number} invalid
	 */
	function pickIndex(invalid) {
		let newIndex = Math.floor(Math.random() * (quotes.length - 1));
		if (newIndex >= invalid) {
			newIndex++;
		}
		index = newIndex;
	}

	onMount(() => {
		index = Math.floor(Math.random() * quotes.length);
	});
</script>

<div id="outer">
	<p>
		{@html quotes[index][0]}
	</p>
	<div>
		<button on:click={() => pickIndex(index)}>↺</button>
		&mdash;
		<strong>{quotes[index][1]}</strong>
	</div>
</div>

<style>
	#outer {
		border: 1px solid var(--border-code);
		background-color: var(--background-code);
		color: var(--text-color-secondary);
		padding: 5px;
		border-radius: 6px;

		/* width: 50%; */
	}

	div div {
		font-weight: bold;
		text-align: right;
	}

	button {
		background: none;
		border: none;
		font-weight: 100;
		float: left;
	}
</style>
