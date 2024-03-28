import { ElementType } from 'react'
import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

interface InfoCardProps {
	title: string
	description: string
	icon: ElementType
	href: string
}

export const InfoCard = ({
	description,
	icon: Icon,
	title,
	href
}: InfoCardProps) => {
	return (
		<Link
			href={href}
			className="group flex w-full max-w-[500px] cursor-pointer items-center justify-between px-1 py-2 transition-all duration-75 hover:bg-secondary/20"
		>
			<div className="flex items-center gap-4">
				<div className="rounded-sm bg-[#262626]/50 px-3 py-3">
					<Icon size={24} className="text-white group-hover:text-primary" />
				</div>
				<div className="flex flex-col">
					<span className="text-base font-medium">{title}</span>
					<p className="text-sm font-medium text-neutral-400">{description}</p>
				</div>
			</div>
			<ChevronRight className="text-primary" />
		</Link>
	)
}
