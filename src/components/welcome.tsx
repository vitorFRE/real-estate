'use client'

import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

import { Icons } from './icons'
import { LampContainer } from './lamp'
import { Button } from './ui/button'

export const Welcome = () => {
	const { data } = useSession()
	return (
		<section className="bg-background">
			<LampContainer>
				<h1 className="text-7xl font-extrabold uppercase tracking-widest text-white sm:text-9xl">
					{data ? data.user.name : 'KIIRO'}
				</h1>
				<div className="absolute top-14 rotate-12 rounded bg-yellow-500 px-2 text-sm text-background">
					{data ? 'Bem vindo' : 'Template'}
				</div>

				<div className="flex gap-4">
					{!data && (
						<Button
							className="font-interFont inline-flex items-center gap-4 rounded bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-400/70"
							onClick={() => signIn('github')}
						>
							Entrar com github <Icons.github />
						</Button>
					)}
					{data && (
						<Button
							className="font-interFont inline-flex items-center gap-4 rounded bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-400/70"
							onClick={() => signOut()}
						>
							Sair
						</Button>
					)}
					<Link
						className="mt-6 sm:mt-0"
						target="_blank"
						href={'https://github.com/vitorFRE/kiiro-template'}
					>
						<Button className="font-interFont inline-flex items-center gap-4 rounded bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-400/70">
							<Icons.github />
							<span>Repositorio</span>
						</Button>
					</Link>
				</div>
			</LampContainer>
		</section>
	)
}
