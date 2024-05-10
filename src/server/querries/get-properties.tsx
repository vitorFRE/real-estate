'use server'

import { ISearchParams } from '@/app/(web)/imoveis/page'

import { db } from '../db'

interface IGetproperties {
	count?: number
	visible?: boolean
}

export const getProperties = async (params: IGetproperties & ISearchParams) => {
	const count = params.count ?? undefined

	let whereQuery = {}

	if (params.visible) {
		whereQuery = {
			visibility: true
		}
	}

	if (params.type) {
		whereQuery = {
			...whereQuery,
			locationValue: params.type
		}
	}

	if (params.areaMin && params.areaMax) {
		whereQuery = {
			...whereQuery,
			area: {
				gte: parseFloat(params.areaMin),
				lte: parseFloat(params.areaMax)
			}
		}
	}

	if (params.moneyMin && params.moneyMax) {
		whereQuery = {
			...whereQuery,
			price: {
				gte: parseFloat(params.moneyMin),
				lte: parseFloat(params.moneyMax)
			}
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
		console.log(error)
		throw new Error('Ocorreu um erro, tente novamente mais tarde!')
	}
}
