import { useState } from 'react'

import { toast } from 'sonner'

import {
	EditPropertyData,
	EditPropertyDTO
} from '@/app/(app)/_validations/edit-property-form-schema'
import { deleteFromStorage, uploadImage } from '@/lib/supabase'
import { validateMediaFiles } from '@/lib/utils'
import { ICreateMedia } from '@/server/mutation/create-property'
import { editProperty } from '@/server/mutation/edit-property'
import { getPropertyById } from '@/server/querries/get-property-by-id'

export const useEditProperty = () => {
	const [isLoading, setIsLoading] = useState(false)

	interface IEditProperty {
		data: EditPropertyData
		userId: string
		propertyId: string
	}

	const edit = async ({ data, userId, propertyId }: IEditProperty) => {
		setIsLoading(true)

		try {
			const currentProperty = await getPropertyById({ id: propertyId })

			if (!currentProperty) {
				toast.error('Propriedade não encontrada')
				setIsLoading(false)
				return
			}

			const parsedData = EditPropertyDTO.safeParse(data)

			if (!parsedData.success) {
				toast.error('Ocorreu um erro ao editar garagem')
				setIsLoading(false)
				return
			}

			if (!data.media) {
				const result = await editProperty({
					id: propertyId,
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
					visibility: data.visibility,

					media: []
				})

				if (result.status === 'success') {
					toast.success(result.message)
				} else {
					toast.error(result.message)
				}

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

			const deletePromises = currentProperty.data?.images.map(async (media) => {
				if (media.path) {
					await deleteFromStorage({ path: media.path })
				}
			})

			await Promise.all(deletePromises ?? [])

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
					return null
				}

				return {
					path: resultUpload.path,
					url: resultUpload.publicUrl
				}
			})

			const resultsUpload = await Promise.all(uploadPromises)

			const filteredUploads = resultsUpload.filter(
				(upload) => upload !== null
			) as ICreateMedia[]

			const result = await editProperty({
				id: propertyId,
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
				media: filteredUploads,
				visibility: data.visibility
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

	return { isLoading, edit }
}
