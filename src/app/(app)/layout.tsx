import { ReactNode } from 'react'

import { SideBar } from './_components/side-bar'

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<SideBar />
			<main className="overflow-y-auto  md:col-start-2">{children}</main>
		</div>
	)
}

export default Layout
