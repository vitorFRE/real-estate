'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Building2, Home, Menu, Smartphone, Tent, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

import { FavoritesHeartCount } from './favorite-hearts-count'
import { NavItem } from './nav-link'

export const Header = () => {
	const [scrolledFromTop, setScrolledFromTop] = useState(false)

	const handleScroll = () => {
		if (window.scrollY >= 50) {
			setScrolledFromTop(true)
		} else {
			setScrolledFromTop(false)
		}
	}

	useEffect(() => {
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header
			className={cn('sticky top-0 z-30 w-full bg-transparent py-4 ', {
				'border-b bg-background/90 dark:border-neutral-900 ': scrolledFromTop
			})}
		>
			<div className="container flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									href="/"
									className="group shrink-0 items-center justify-center gap-2  text-lg font-semibold text-primary-foreground md:text-base"
								>
									<h1 className="font-medium text-black dark:text-white md:text-xl ">
										RealEstate
									</h1>
									<span className="sr-only">Acme Inc</span>
								</Link>

								<NavItem href="/" text="Inicio" icon={Home} />
								<NavItem href="/imoveis" text="Imóveis" icon={Building2} />
								<NavItem href="/contato" text="Contato" icon={Smartphone} />
							</nav>
						</SheetContent>
					</Sheet>
					<Link
						className={cn('flex items-center gap-2 font-bold transition-all', {
							'md:scale-95': scrolledFromTop
						})}
						href="/"
					>
						<Tent className="hidden  md:block" size={24} />
						<h1 className="font-medium  md:text-xl ">RealEstate</h1>
					</Link>
				</div>

				<nav className="hidden items-center gap-4 md:flex">
					<NavItem href="/" text="Inicio" />
					<NavItem href="/imoveis" text="Imóveis à venda" />
					<NavItem href="/contato" text="Contato" />
				</nav>

				<div className="flex items-center gap-2">
					<FavoritesHeartCount />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="overflow-hidden border-none"
							>
								<User size={24} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Menu</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Favoritos</DropdownMenuItem>
							<DropdownMenuItem>Imóveis</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Sair</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}