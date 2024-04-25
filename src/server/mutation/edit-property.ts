'use server'

import { revalidatePath } from 'next/cache'

import { getSession } from '../auth'
import { db } from '../db'

export interface ICreateMedia {
	publicUrl: string
	path: string
}

interface IEditProperty {
	id: string
	title: string
	description: string
	price: string
	locationValue: string
	bedroomCount: number
	bathroomCount: number
	city: string
	state: string
	neighborhood: string
	area: string
	buildingArea: string
	latitude: number
	longitude: number
	visibility: boolean

	media: ICreateMedia[]
}

interface IUpdateData extends Omit<IEditProperty, 'id' | 'media'> {
	images?: {
		create: { url: string; path: string }[]
		deleteMany: { path: { notIn: string[] } }
	}
}

export const editProperty = async (props: IEditProperty) => {
	try {
		const session = await getSession()

		if (!session) {
			throw new Error('Unauthorized')
		}

		if (session.user.role !== 'ADMIN') {
			throw new Error('Unauthorized')
		}

		const updateData: IUpdateData = {
			title: props.title,
			description: props.description,
			price: props.price,
			locationValue: props.locationValue,
			bedroomCount: props.bedroomCount,
			bathroomCount: props.bathroomCount,
			city: props.city,
			state: props.state,
			area: props.area,
			buildingArea: props.buildingArea,
			latitude: props.latitude,
			longitude: props.longitude,
			neighborhood: props.neighborhood,
			visibility: props.visibility
		}

		if (props.media && props.media.length > 0) {
			updateData.images = {
				create: props.media.map((media) => ({
					url: media.publicUrl,
					path: media.path
				})),
				deleteMany: {
					path: {
						notIn: props.media.map((media) => media.path)
					}
				}
			}
		}

		await db.property.update({
			where: { id: props.id },
			data: updateData,
			include: {
				images: true
			}
		})

		revalidatePath('/dashboard/editar/[id]', 'page')

		return {
			status: 'success',
			message: 'Propriedade editada'
		}
	} catch (error) {
		return {
			status: 'error',
			message: `${error}`
		}
	}
}
