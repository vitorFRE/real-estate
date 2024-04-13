'use client'

import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarLinkProps extends PropsWithChildren {
	href: string
}

export const SidebarItem = (props: SidebarLinkProps) => {
	const pathname = usePathname()
	const isActive = pathname === props.href.toString()

	return (
		<Button
			asChild
			variant={'ghost'}
			className={cn(
				'flex select-none items-center justify-start gap-2 rounded-md p-2 text-sm hover:text-primary',
				{
					'opacity-50 hover:opacity-75': !isActive,
					'text-primary': isActive
				}
			)}
		>
			<Link href={props.href}>{props.children}</Link>
		</Button>
	)
}
