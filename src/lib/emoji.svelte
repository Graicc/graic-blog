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

	onMount(() => {
		const emojiIndex = Math.floor(Math.random() * emojis.length);
		emoji = emojis[emojiIndex];
	});
</script>

{emoji}
