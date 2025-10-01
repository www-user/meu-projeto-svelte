
import { fail } from '@sveltejs/kit';
import { influencerSchema } from '$lib/schemas/influencerSchema';
import { ZodError } from 'zod';


const spaceId = import.meta.env.VITE_STORYBLOK_SPACE_ID;
const apiToken = import.meta.env.VITE_STORYBLOK_MANAGEMENT_TOKEN;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			const validatedData = influencerSchema.parse(data);

			const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: apiToken,
				},
				body: JSON.stringify({
					story: {
						name: validatedData.nome,
						slug: validatedData.arroba.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
						content: {
							component: 'influencer', 
							...validatedData,
						},
					},
					publish: 0, 
				}),
			});

			if (!response.ok) {
				console.error('Erro da API do Storyblok:', await response.text());
				return fail(500, { message: 'Erro ao submeter o perfil.' });
			}

			return { success: true };

		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, { data, errors });
			}
			console.error('Erro inesperado:', err);
			return fail(500, { message: 'Ocorreu um erro inesperado.' });
		}
	},
};