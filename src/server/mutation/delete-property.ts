'use server'

import { revalidatePath } from 'next/cache'

import { getSession } from '../auth'
import { db } from '../db'
import { deleteImageFromSupabase } from './file-upload'

export const deleteProperty = async (propertyId: string) => {
	try {
		const session = await getSession()

		if (!session) {
			throw new Error('Unauthorized')
		}

		if (session.user.role !== 'ADMIN') {
			throw new Error('Unauthorized')
		}

		const property = await db.property.findUnique({
			where: { id: propertyId },
			include: { images: true }
		})

		if (!property) {
			throw new Error('Property not found')
		}

		const deleteImages = property.images.map(async (media) => {
			if (media.path) {
				await deleteImageFromSupabase(media.path)
			}
		})

		await Promise.all(deleteImages)

		await db.property.delete({
			where: { id: propertyId }
		})

		revalidatePath('/dashboard/propriedades')

		return {
			status: 'success',
			message: 'Propriedade excluída'
		}
	} catch (error) {
		console.log(error)
		return {
			status: 'error',
			message: `${error}`
		}
	}
}
