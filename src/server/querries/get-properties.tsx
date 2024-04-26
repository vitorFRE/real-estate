'use server'

import { db } from '../db'

interface IGetproperties {
	count?: number
	visible?: boolean
}

export const getProperties = async (params: IGetproperties) => {
	const count = params.count ?? undefined

	let whereQuery = {}

	if (params.visible) {
		whereQuery = {
			visibility: true
		}
	}

	try {
		const properties = await db.property.findMany({
			take: count,
			where: whereQuery,
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
