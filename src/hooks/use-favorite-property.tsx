import { useState } from 'react'

import { toast } from 'sonner'

import { favoriteProperty } from '@/server/mutation/favorite-property'
import { getFavoriteUserProperties } from '@/server/querries/get-favorite-user-properties'

export const useFavoriteProperty = () => {
	const [isLoading, setIsLoading] = useState(false)

	const isFavorited = async (propertyId: string) => {
		try {
			const favoriteProperties = await getFavoriteUserProperties()
			return Array.isArray(favoriteProperties.data)
				? favoriteProperties.data.includes(propertyId)
				: false
		} catch (error) {
			return false
		}
	}

	const toggleFavorite = async (propertyId: string) => {
		setIsLoading(true)
		try {
			const result = await favoriteProperty(propertyId)

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

	return { isLoading, toggleFavorite, isFavorited }
}
