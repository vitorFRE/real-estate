import { useState } from 'react'

import { toast } from 'sonner'

import {
	CreatePropertyData,
	CreatePropertyDTO
} from '@/app/(app)/_validations/create-property-form-schema'
import { removeNonNumericChars, validateMediaFiles } from '@/lib/utils'
import { createProperty, ICreateMedia } from '@/server/mutation/create-property'
import { uploadFiles } from '@/server/mutation/file-upload'

export const useCreateProperty = () => {
	const [isLoading, setIsLoading] = useState(false)

	interface ICreate {
		data: CreatePropertyData
		userId: string
	}

	const create = async ({ data, userId }: ICreate) => {
		setIsLoading(true)

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

			const formData = new FormData()
			Array.from(data.media ?? []).forEach((file) => {
				formData.append(`file`, file)
			})

			const resultUploads = await uploadFiles(formData, 'properties', userId)

			if (!resultUploads || resultUploads.status !== 'success') {
				toast.error('Erro ao fazer upload dos arquivos')
				setIsLoading(false)
				return { status: 'error', message: 'Erro ao fazer upload dos arquivos' }
			}

			const mediaFiles: ICreateMedia[] = resultUploads.files
				? resultUploads.files.map((file) => ({
						path: file.path ?? '',
						publicUrl: file.publicUrl || ''
					}))
				: []

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
				price: removeNonNumericChars(data.price),
				state: data.state,
				neighborhood: data.neighborhood,
				title: data.title,
				media: mediaFiles
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
