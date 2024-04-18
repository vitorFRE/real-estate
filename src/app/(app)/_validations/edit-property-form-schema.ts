import z from 'zod'

export const EditPropertyDTO = z.object({
	title: z
		.string()
		.min(1, {
			message: 'O titulo deve conter pelo menos um caractere.'
		})
		.max(120, {
			message: 'O título não pode ter mais de 120 caracteres.'
		}),
	locationValue: z.string({
		required_error: 'Por favor selecione o tipo do imovel.'
	}),
	price: z
		.string()
		.min(1, {
			message: 'O preço deve conter pelo menos um caractere.'
		})
		.max(20, {
			message: 'O preço não pode ter mais de 20 caracteres.'
		}),
	description: z
		.string()
		.min(1, {
			message: 'A descrição deve conter pelo menos um caractere.'
		})
		.max(600, {
			message: 'A descrição não pode ter mais de 600 caracteres.'
		}),
	bedroomCount: z
		.number({ invalid_type_error: 'Deve ser preenchido' })
		.min(1, {
			message: 'O número de quartos deve conter pelo menos um caractere.'
		})
		.max(30, {
			message: 'O número de quartos não pode ser maior que 30.'
		}),
	bathroomCount: z
		.number({ invalid_type_error: 'Deve ser preenchido' })
		.min(1, {
			message: 'O número de banheiros deve conter pelo menos um caractere.'
		})
		.max(20, {
			message: 'O número de banheiros não pode ser maior que 20.'
		}),
	city: z
		.string()
		.min(2, {
			message: 'A cidade deve conter pelo menos dois caractere.'
		})
		.max(50, {
			message: 'A cidade não pode ter mais de 50 caracteres.'
		}),
	neighborhood: z
		.string()
		.min(2, {
			message: 'O bairro deve conter pelo menos dois caractere.'
		})
		.max(60, {
			message: 'O bairro não pode ter mais de 100 caracteres.'
		}),
	state: z
		.string()
		.min(2, {
			message: 'O estado deve conter pelo menos dois caractere.'
		})
		.max(2, {
			message: 'O estado deve conter no maximo dois caractere.'
		}),
	area: z.string().min(1, {
		message: 'A area deve conter pelo menos um caractere.'
	}),
	buildingArea: z.string().min(1, {
		message: 'A area construida deve conter pelo menos um caractere.'
	}),
	latitude: z
		.number({ required_error: 'Deve ser marcado uma posição.' })
		.min(-90, 'Latitude deve ser maior ou igual a -90')
		.max(90, 'Latitude deve ser menor ou igual a 90'),
	longitude: z
		.number()
		.min(-180, 'Longitude deve ser maior ou igual a -180')
		.max(180, 'Longitude deve ser menor ou igual a 180'),
	media: z.custom<FileList>().nullable(),
	visibility: z.boolean()
})

export type EditPropertyData = z.infer<typeof EditPropertyDTO>
