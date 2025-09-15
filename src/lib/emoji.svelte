<script>
	import { onMount } from 'svelte';

	const emojis = [
		'❤️',
		'🍅',
		'🍇',
		'🍈',
		'🍉',
		'🍊',
		'🍌',
		'🍍',
		'🍓',
		'🍋',
		'🍐',
		'🍎',
		'🍏',
		'🥑',
		'🥝',
		'🥭'
	];
	let emoji = '❤️';

	let reload = () => {
		const emojiIndex = Math.floor(Math.random() * emojis.length);
		emoji = emojis[emojiIndex];
	};
	onMount(reload);
</script>

<span role="none" on:mouseover={reload} on:focus={reload}>{emoji}</span>
