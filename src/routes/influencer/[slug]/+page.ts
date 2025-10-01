
import type { PageLoad } from './$types';
import { storyblokInit, useStoryblokApi, apiPlugin } from '@storyblok/svelte';

export const load: PageLoad = async ({ params }) => {
	const accessToken = import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN;

	storyblokInit({
		accessToken: accessToken,
		use: [apiPlugin]
	});
	const storyblokApi = useStoryblokApi();

	try {
		const fullSlug = `influencers/${params.slug}`;
		const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
			version: 'published'
		});

		return {
			story: data.story
		};
	} catch (error) {
		console.error(`Erro ao buscar a story do influenciador [${params.slug}]:`, error);
		return {
			story: null
		};
	}
};