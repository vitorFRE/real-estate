'use client'

import Link from 'next/link'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'

const FavoritesHeartCount: React.FC = () => {
	const currentUser = false

	return (
		<>
			{currentUser ? (
				<Button
					asChild
					size={'icon'}
					variant={'outline'}
					className="border-none"
				>
					<Link href="/favoritos">
						<span className="relative cursor-pointer">
							<Heart size={24} className=" cursor-pointer" />
							<p className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-black ">
								24
							</p>
						</span>
					</Link>
				</Button>
			) : (
				<Button
					size={'icon'}
					variant={'outline'}
					className="cursor-pointer border-none"
					onClick={() => console.log('redirect to login page')}
				>
					<span className="relative">
						<Heart size={24} className="cursor-pointer" />
						<p className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-black ">
							0
						</p>
					</span>
				</Button>
			)}
		</>
	)
}

export default FavoritesHeartCount
