import type { Metadata } from 'next'

import '../styles/globals.css'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sooner'
import { siteConfig } from '@/config/site'
import { lexend } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import AuthProvider from '@/providers/auth-provider/auth-provider'
import { Provider } from '@/providers/main-provider'
import { ThemeProvider } from '@/providers/theme-provider/theme-provider'
import { getSession } from '@/server/auth'
import { getFavoriteProperties } from '@/server/querries/get-favorite-properties'

import { Footer } from './(web)/_components/footer'
import { Header } from './(web)/_components/header'
import { TopBar } from './(web)/_components/top-bar'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const session = await getSession()
	let favoriCount = null
	if (session) {
		favoriCount = await getFavoriteProperties()
	}

	return (
		<html lang="pt-br" suppressHydrationWarning>
			<body className={cn('font-sans', lexend.variable)}>
				<Provider providers={[AuthProvider, ThemeProvider]}>
					<TopBar />
					<Header favoritesCount={favoriCount?.data?.length || 0} />
					{children}
					<Toaster />
					<TailwindIndicator />
					<Footer />
				</Provider>
			</body>
		</html>
	)
}
