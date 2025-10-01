// src/lib/types.ts
export interface Influencer {
	id: number;
	slug: string; // <-- ADICIONE ESTA LINHA
	nome: string;
	arroba: string;
	nicho: string;
	foto_url: string;
	foto_placeholder_url: string;
	bio: string;
	instagram_link: string;
	contato_link: string;
	video_url: string;
}