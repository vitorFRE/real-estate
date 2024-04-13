'use server'

import { db } from '../db'

interface IGetproperties {
	count?: number
}

export const getProperties = async (params: IGetproperties) => {
	const count = params.count ?? undefined

	try {
		const properties = await db.property.findMany({
			take: count,
			include: {
				images: true
			}
		})

		if (!properties || properties.length === 0) {
			return {
				status: 'error',
				message: 'Nenhuma propriedade encontrada!'
			}
		}

		return {
			status: 'sucess',
			data: properties
		}
	} catch (error) {
		throw new Error('Ocorreu um erro, tente novamente mais tarde!')
	}
}
