export async function load({ params }) {
	try {
		const post = await import(`./../../../posts/${params.uri}.md`);
		const { title, subtitle, date, published } = post.metadata;
		const content = post.default;

		return {
			content,
			title,
			subtitle,
			date,
			published
		};
	} catch (error) {
		return {
			status: 404
		};
	}
}
