'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useFavoriteProperty } from '@/hooks/use-favorite-property'
import { cn } from '@/lib/utils'

interface HeartButtonProps {
	propertyId: string
	className?: string
}

export const FavoriteButton: React.FC<HeartButtonProps> = ({
	propertyId,
	className
}) => {
	const { toggleFavorite, isFavorited, isLoading } = useFavoriteProperty()
	const { status } = useSession()
	const router = useRouter()

	const [favorited, setFavorited] = useState(false)

	useEffect(() => {
		const checkIsFavorited = async () => {
			if (status === 'authenticated') {
				const isAlreadyFavorited = await isFavorited(propertyId)
				setFavorited(isAlreadyFavorited)
			} else {
				setFavorited(false)
			}
		}

		checkIsFavorited()
	}, [isFavorited, propertyId, status])

	const handleClick = () => {
		if (status === 'authenticated') {
			toggleFavorite(propertyId)
		} else {
			router.push('/login')
		}
	}

	return (
		<div
			onClick={handleClick}
			className={cn(' cursor-pointer transition hover:opacity-80', className, {
				'animate-ping': isLoading
			})}
		>
			<Heart
				size={28}
				className={`text-white ${
					favorited ? 'fill-rose-500' : 'fill-neutral-500/70'
				} `}
			/>
		</div>
	)
}
