import { Icons } from '@/components/icons'

import { InfoCard } from './_components/info-card'

interface AuthLayoutProps {
	children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className="grid min-h-screen w-screen grid-cols-1 bg-white md:grid-cols-2">
			<main className="col-span-1 flex items-center justify-center px-4">
				{children}
			</main>
			<aside className="col-span-1 hidden flex-col items-center justify-center gap-4 bg-background px-4 md:flex">
				<InfoCard
					href="/"
					icon={Icons.home}
					title="Ver casas"
					description="Continue navegando..."
				/>
				<hr className="w-full max-w-[500px] border" />
				<InfoCard
					href="/"
					icon={Icons.layers}
					title="Serviços"
					description="Vejas todos os serviços que oferecemos"
				/>
				<hr className="w-full max-w-[500px] border" />
				<InfoCard
					href="/"
					icon={Icons.userRoundSeacrch}
					title="Contato"
					description="Quer divulgar uma casa ou tem alguma duvida ?"
				/>
			</aside>
		</div>
	)
}

export default AuthLayout
