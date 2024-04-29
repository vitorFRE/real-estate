import Link from 'next/link'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FavoritesHeartCountProps {
	favoritesCount: number
}

export const FavoritesHeartCount = ({
	favoritesCount
}: FavoritesHeartCountProps) => {
	return (
		<>
			{favoritesCount ? (
				<Button
					asChild
					size={'icon'}
					variant={'outline'}
					className="border-none"
				>
					<Link href="/favoritos">
						<span className="relative cursor-pointer">
							<Heart size={24} className=" cursor-pointer" />
							<p
								className={cn(
									'absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-black'
								)}
							>
								{favoritesCount}
							</p>
						</span>
					</Link>
				</Button>
			) : (
				<Button
					asChild
					size={'icon'}
					variant={'outline'}
					className="border-none"
				>
					<Link href="/login">
						<span className="relative cursor-pointer">
							<Heart size={24} className=" cursor-pointer" />
							<p
								className={cn(
									'absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-black'
								)}
							>
								0
							</p>
						</span>
					</Link>
				</Button>
			)}
		</>
	)
}
