'use server'

import { revalidatePath } from 'next/cache'

import { getSession } from '../auth'
import { db } from '../db'

export const favoriteProperty = async (propertyId: string) => {
	try {
		const session = await getSession()

		if (!session) {
			throw new Error('Unauthorized')
		}

		if (!propertyId || typeof propertyId !== 'string') {
			throw new Error('Invalid ID')
		}

		const property = await db.property.findUnique({
			where: { id: propertyId },
			include: { images: true }
		})

		if (!property) {
			throw new Error('Property not found')
		}

		const existingFavorite = await db.favorite.findUnique({
			where: {
				userId_propertyId: {
					userId: session.user.id,
					propertyId: propertyId
				}
			}
		})

		if (existingFavorite) {
			await db.favorite.delete({
				where: { id: existingFavorite.id }
			})

			revalidatePath('/')
			revalidatePath('/imoveis')

			return {
				status: 'success',
				message: 'Propriedade desfavoritada'
			}
		}

		await db.favorite.create({
			data: {
				User: { connect: { id: session.user.id } },
				Property: { connect: { id: propertyId } }
			}
		})

		revalidatePath('/')

		return {
			status: 'success',
			message: 'Propriedade Favoritada'
		}
	} catch (error) {
		console.log(error)
		return {
			status: 'error',
			message: `${error}`
		}
	}
}
