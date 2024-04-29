'use client'

import { useState } from 'react'

import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export const SocialLogins = () => {
	const [isLoading, setIsLoading] = useState(false)

	const githubLogin = async () => {
		setIsLoading(true)
		try {
			await signIn('github')
		} catch (error) {
			toast.error('Ocorreu um erro, tente novamente mais tarde!')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<Button
				onClick={githubLogin}
				variant="outline"
				className="w-full gap-2"
				disabled={isLoading}
			>
				<Icons.github className="h-3.5 w-3.5 fill-foreground" />
				<span>{isLoading ? 'Entrando...' : 'Continue com Github'}</span>
			</Button>
		</div>
	)
}
