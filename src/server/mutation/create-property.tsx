'use server'

import { getSession } from '../auth'
import { db } from '../db'

export interface ICreateMedia {
	url: {
		publicUrl: string
	}
	path: string
}

interface ICreateProperty {
	title: string
	description: string
	price: string
	locationValue: string
	bedroomCount: number
	bathroomCount: number
	city: string
	state: string
	area: string
	buildingArea: string
	latitude: number
	longitude: number

	media: ICreateMedia[]
}

export const createProperty = async (props: ICreateProperty) => {
	try {
		const session = await getSession()
		if (!session) {
			throw new Error('Unauthorized')
		}

		await db.property.create({
			data: {
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
				owner: { connect: { id: session.user.id } },
				images: {
					create: props.media.map((media) => ({
						url: media.url.publicUrl,
						path: media.path
					}))
				}
			},
			include: {
				images: true
			}
		})

		return {
			status: 'success',
			message: 'Property created successfully'
		}
	} catch (error) {
		console.log(error)
		return {
			status: 'error',
			message: 'Something went wrong'
		}
	}
}
