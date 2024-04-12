import { useState } from 'react'

import { toast } from 'sonner'

import {
	CreatePropertyData,
	CreatePropertyDTO
} from '@/app/(app)/_validations/create-property-form-schema'
import { uploadImage } from '@/lib/supabase'
import { validateMediaFiles } from '@/lib/utils'
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
			const parsedData = CreatePropertyDTO.safeParse(data)

			if (!parsedData.success) {
				toast.error('Ocorreu um erro ao criar garagem')
				setIsLoading(false)
				return
			}

			if (!validateMediaFiles(data.media)) {
				toast.error(
					'Arquivos de mídia inválidos. Certifique-se de que são imagens JPEG ou PNG e que o tamanho total não ultrapasse 10MB.'
				)
				setIsLoading(false)
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
				neighborhood: data.neighborhood,
				title: data.title,
				media: filteredUploads
			})

			if (result.status === 'success') {
				toast.success(result.message)
			} else {
				toast.error(result.message)
			}
		} catch (error) {
			return {
				status: 'error',
				message: `${error}`
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, create }
}
