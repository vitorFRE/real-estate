import Link from 'next/link'

import {
	Bell,
	Building,
	Home,
	LayoutDashboard,
	Plus,
	Settings
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { SidebarItem } from './side-bar-item'
import { SignOut } from './signout-button'

export const SideBar = () => {
	return (
		<div className="fixed bottom-0 left-0 top-0 hidden border-r bg-muted/10 md:block md:w-[220px] lg:w-[280px]">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<Home className="h-6 w-6" />
						<span>Real Estate</span>
					</Link>
					<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
						<Bell className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<div className="flex-1">
					<nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
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
				</div>
				<div className="mt-auto space-y-2 p-4">
					<SidebarItem href="/dashboard/configuracoes">
						<Settings />
						<span>Configurações</span>
					</SidebarItem>
					<SignOut />
				</div>
			</div>
		</div>
	)
}
