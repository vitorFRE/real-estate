import { useState } from 'react'

import { toast } from 'sonner'

import { deleteProperty } from '@/server/mutation/delete-property'

export const useDeleteProperty = () => {
	const [isLoading, setIsLoading] = useState(false)

	const onDelete = async (propertyId: string) => {
		setIsLoading(true)

		try {
			const result = await deleteProperty(propertyId)

			if (result?.status === 'sucess') {
				toast.success(result.message)
			} else {
				toast.error(result?.message)
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

	return { isLoading, onDelete }
}
