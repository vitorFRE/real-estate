'use server'

import { db } from '../db'

interface IGetPropertyById {
	id: string
}

export const getPropertyById = async (params: IGetPropertyById) => {
	try {
		const property = await db.property.findUnique({
			where: { id: params.id },
			include: {
				images: true
			}
		})

		if (!property) {
			return {
				status: 'error',
				message: 'Nenhuma propriedade encontrada!'
			}
		}

		return {
			status: 'sucess',
			data: property
		}
	} catch (error) {
		throw new Error('Ocorreu um erro, tente novamente mais tarde!')
	}
}
