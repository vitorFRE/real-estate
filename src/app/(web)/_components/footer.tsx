'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { footerSections } from '../_constants/data'
import { ModeToggle } from './mode-toggle'

export const Footer = () => {
	const pathname = usePathname()

	function backToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (pathname === '/login' || pathname === '/dashboard') {
		return null
	}

	return (
		<footer className="container mx-auto mt-14 md:mt-28">
			<div className="flex flex-col justify-between gap-7 sm:flex-row sm:gap-0">
				<div className="flex flex-col items-center gap-4 sm:items-start">
					<h1 className="font-semibold text-foreground">RealEstate</h1>
					<p className="text-center text-muted-foreground sm:text-start">
						O seu lugar esta aqui.
					</p>
				</div>
				<nav className="flex flex-col items-center gap-16 sm:flex-row sm:items-start">
					{footerSections.sections.map((section) => (
						<div
							key={section.title}
							className="flex flex-col items-center gap-4 sm:items-start"
						>
							<span className="font-semibold text-foreground">
								{section.title}
							</span>
							{section.items.map((item) => (
								<Link
									key={item.title}
									className="text-muted-foreground hover:text-foreground/90"
									href={item.url}
								>
									{item.title}
								</Link>
							))}
						</div>
					))}
				</nav>
			</div>
			<hr className="mb-6 mt-16 h-1 w-full text-muted-foreground" />
			<div className="mb-4 flex flex-col-reverse items-center sm:flex-row sm:justify-between">
				<div className="flex items-center gap-4">
					<ModeToggle />
					<span className="text-center text-foreground sm:text-start">
						© 2024
					</span>
				</div>
				<div className="flex gap-2">
					<Button
						onClick={backToTop}
						className="text-site-primary w-min"
						variant={'link'}
					>
						Voltar para o topo <ChevronsUp className="text-primary" />
					</Button>
				</div>
			</div>
		</footer>
	)
}
