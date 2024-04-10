'use server'

import { db } from '../db'

export const getProperties = async () => {
	try {
		const properties = await db.property.findMany({
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
