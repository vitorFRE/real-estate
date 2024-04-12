import { ElementType } from 'react'
import Link from 'next/link'

import {
	Building,
	Home,
	LayoutDashboard,
	Menu,
	Plus,
	Settings
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { SidebarItem } from './side-bar-item'
import { SignOut } from './signout-button'

interface DashboardHeaderProps {
	icon: ElementType
	title: string
}

export const DashboardHeader = async ({
	title,
	icon: Icon
}: DashboardHeaderProps) => {
	return (
		<div className="flex flex-row items-center justify-between border-b px-4 md:flex-row-reverse">
			<div className="flex items-center gap-4 backdrop-blur-md">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="z-[9999] flex flex-col">
						<nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
							<Link
								href="/"
								className="mb-6 flex items-center gap-2 px-2 text-lg font-semibold"
							>
								<Home className="h-6 w-6" />
								<span className="sr-only">Real Estate</span>
							</Link>
							<SidebarItem href="/dashboard">
								<LayoutDashboard />
								<span>Inicio</span>
							</SidebarItem>
							<SidebarItem href="/dashboard/propriedades">
								<Building />
								<span>Propriedade</span>
							</SidebarItem>
							<SidebarItem href="/dashboard/adicionar">
								<Plus />
								<span>Adicionar propriedade</span>
							</SidebarItem>
						</nav>

						<div className="mt-auto space-y-2 p-4">
							<SidebarItem href="/dashboard/configuracoes">
								<Settings />
								<span>Configurações</span>
							</SidebarItem>
							<SignOut />
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<div className="flex h-[59px] items-center gap-2">
				<Icon className="text-lg opacity-50" />
				<span>{title}</span>
			</div>
		</div>
	)
}
