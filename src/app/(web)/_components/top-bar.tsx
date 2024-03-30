'use client'

import Link from 'next/link'

import { Icons } from '@/components/icons'

export const TopBar = () => {
	return (
		<section className="border-b dark:border-neutral-900">
			<div className="container flex h-[64px] items-center justify-between">
				<div className="flex items-center gap-4">
					<Icons.phone size={24} />
					<span className=" font-medium">(21) 92011-2910</span>
				</div>
				<div className="flex gap-4">
					<Link
						href={'/'}
						className="cursor-pointer transition-colors duration-75 hover:text-primary"
					>
						<Icons.facebook />
					</Link>
					<Link
						href={'/'}
						className="cursor-pointer transition-colors duration-75 hover:text-primary"
					>
						<Icons.instagram />
					</Link>
				</div>
			</div>
		</section>
	)
}
