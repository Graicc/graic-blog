export async function load({ params }) {
	try {
		const post = await import(`/src/posts/${params.uri}.md`);
		const { title, date } = post.metadata;
		const content = post.default;

		return {
			content,
			title,
			date
		};
	} catch (error) {
		return {
			status: 404,
		};
	}
}