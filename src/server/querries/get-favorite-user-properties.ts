'use server'

import { getSession } from '../auth'
import { db } from '../db'

export const getFavoriteUserProperties = async () => {
	try {
		const session = await getSession()

		if (!session) {
			throw new Error('Unauthorized')
		}

		const user = await db.user.findUnique({
			where: { id: session.user.id },
			include: {
				favorites: true
			}
		})

		if (!user) {
			return {
				status: 'error',
				message: 'Sem favoritos'
			}
		}

		const favoritePropertyIds = user.favorites.map(
			(favorite) => favorite.propertyId
		)

		return {
			status: 'sucess',
			data: favoritePropertyIds
		}
	} catch (error) {
		throw new Error('Ocorreu um erro, tente novamente mais tarde!')
	}
}
