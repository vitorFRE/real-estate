import { getSession } from '../auth'
import { db } from '../db'

export const getFavoriteProperties = async () => {
	try {
		const session = await getSession()

		if (!session) {
			throw new Error('Unauthorized')
		}

		const favorites = await db.favorite.findMany({
			where: {
				userId: session.user.id
			},
			select: {
				Property: {
					include: {
						images: true
					}
				}
			}
		})

		const visibleFavorites = favorites.filter(
			(favorite) => favorite.Property?.visibility
		)

		if (visibleFavorites.length <= 0) {
			return {
				status: 'error',
				message: 'Sem favoritos visíveis'
			}
		}

		return {
			status: 'sucesso',
			data: visibleFavorites
		}
	} catch (error) {
		console.log(error)
		throw new Error('Ocorreu um erro, tente novamente mais tarde!')
	}
}
