
import { z } from 'zod';

export const influencerSchema = z.object({
	nome: z.string().trim().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
	arroba: z.string().trim().min(1, { message: 'O @Handle é obrigatório.' }),
	nicho: z.string().trim().min(3, { message: 'O nicho deve ter pelo menos 3 caracteres.' }),
});