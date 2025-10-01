import type { PageLoad } from './$types';
import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import type { Influencer } from '$lib/types';

interface RawStoryblokStory {
	id: number;
	content: {
		nome: string;
		arroba: string;
		nicho: string;
		bio: string;
		foto_url: { filename: string };
		foto_placeholder_url: { filename: string };
		instagram_link: { url: string };
		contato_link: { url: string };
		video_url: { url: string };
	};
}

export const load: PageLoad = async () => {
	// Acessamos a variável de ambiente diretamente do objeto 'import.meta.env' do Vite
	const accessToken = import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN;

	storyblokInit({
		accessToken: accessToken,
		use: [apiPlugin]
	});

	const storyblokApi = useStoryblokApi();

	try {
		const { data } = await storyblokApi.get('cdn/stories', {
			content_type: 'influencer',
			version: 'published'
		});
		const influencers: Influencer[] = data.stories.map((story: RawStoryblokStory & { slug: string }) => {
			return {
				id: story.id,
				slug: story.slug, // <-- ADICIONADO
				nome: story.content.nome,
				arroba: story.content.arroba,
				nicho: story.content.nicho,
				bio: story.content.bio,
				foto_url: story.content.foto_url.filename,
				foto_placeholder_url: story.content.foto_placeholder_url.filename,
				instagram_link: story.content.instagram_link.url,
				contato_link: story.content.contato_link.url,
				video_url: story.content.video_url.url,
			};
		});
		return {
			influencers
		};

	} catch (error) {
		console.error('Erro ao buscar ou mapear dados do Storyblok:', error);
		return {
			influencers: []
		};
	}
};