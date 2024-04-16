import { z } from 'zod'

export const ContactFormDTO = z.object({
	name: z.string().min(1, { message: 'Esse campo precisa ser preenchido' }),
	email: z
		.string()
		.min(1, { message: 'Esse campo precisa ser preenchido' })
		.email('Precisa ser um email valido'),
	content: z.string().min(10, { message: 'No minimo 10 caracteres' })
})

export type ContactFormData = z.infer<typeof ContactFormDTO>
