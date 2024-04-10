import { useState } from 'react'

import { toast } from 'sonner'

import { CreatePropertyData } from '@/app/(app)/_components/forms/create-property-form'
import { uploadImage } from '@/lib/supabase'
import { createProperty, ICreateMedia } from '@/server/mutation/create-property'

export const useCreateProperty = () => {
	const [isLoading, setIsLoading] = useState(false)

	interface ICreate {
		data: CreatePropertyData
		userId: string
	}

	const create = async ({ data, userId }: ICreate) => {
		setIsLoading(true)
		let resultsUpload = []

		try {
			if (!data.media) {
				return
			}

			const filesArray = Array.from(data.media)

			const uploadPromises = filesArray.map(async (file) => {
				const resultUpload = await uploadImage({
					file,
					folder: 'properties',
					userId
				})

				if (resultUpload && resultUpload.error) {
					toast.error(resultUpload.error)
					console.log(resultUpload.error)
					return
				}

				return {
					path: resultUpload.path,
					url: resultUpload.publicUrl
				}
			})

			resultsUpload = await Promise.all(uploadPromises)

			const filteredUploads = resultsUpload.filter(
				(upload) => upload !== undefined
			) as ICreateMedia[]

			const result = await createProperty({
				area: data.area,
				bedroomCount: data.bedroomCount,
				bathroomCount: data.bathroomCount,
				buildingArea: data.buildingArea,
				city: data.city,
				description: data.description,
				locationValue: data.locationValue,
				latitude: data.latitude,
				longitude: data.longitude,
				price: data.price,
				state: data.state,
				title: data.title,
				media: filteredUploads
			})

			if (result.status === 'success') {
				toast.success(result.message)
			} else {
				toast.error(result.message)
			}

			console.log(resultsUpload)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, create }
}
