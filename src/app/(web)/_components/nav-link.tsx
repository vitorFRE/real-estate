'use client'

import { ElementType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
	text: string
	href: string
	icon?: ElementType
}

export const NavItem = ({ text, href, icon: Icon, ...rest }: NavItemProps) => {
	const pathname = usePathname()
	const isActive = pathname === href.toString()
	return (
		<Link
			{...rest}
			href={href}
			className={cn(
				'group flex gap-4 px-2.5 font-medium text-muted-foreground transition-all duration-200 hover:text-foreground md:items-center md:justify-center md:gap-0 md:px-0 ',
				{
					'text-foreground': isActive
				}
			)}
		>
			{Icon && <Icon className="h-5 w-5" />}
			{text}
		</Link>
	)
}
