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

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-br" suppressHydrationWarning>
			<body className={cn('font-sans', lexend.variable)}>
				<Provider providers={[AuthProvider, ThemeProvider]}>
					{children}
					<Toaster />
					<TailwindIndicator />
				</Provider>
			</body>
		</html>
	)
}
