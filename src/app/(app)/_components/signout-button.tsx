'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export function SignOut() {
	return (
		<Button
			onClick={() => signOut()}
			variant={'ghost'}
			className="flex w-full select-none items-center justify-start gap-2 rounded-md p-2 text-sm opacity-50 hover:text-red-600 hover:opacity-100"
		>
			<LogOut />
			<span>Sair</span>
		</Button>
	)
}
