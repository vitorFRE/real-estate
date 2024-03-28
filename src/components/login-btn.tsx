'use client'

import Link from 'next/link'

import { signIn, useSession } from 'next-auth/react'

import { Icons } from './icons'
import { Button } from './ui/button'

export default function LoginBtn() {
	const { data: session } = useSession()
	if (session) {
		return (
			<>
				<Link href={'/'}>
					<Button variant={'outline'}>Dashboard</Button>
				</Link>
			</>
		)
	}
	return (
		<Button
			className="font-interFont inline-flex items-center gap-4 rounded bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-400/70"
			onClick={() => signIn('github')}
		>
			Entrar com github <Icons.github />
		</Button>
	)
}
