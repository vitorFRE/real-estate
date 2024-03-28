import { PrismaAdapter } from '@auth/prisma-adapter'
import { getServerSession, type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/environment/env'

import { db } from './db'

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(db) as NextAuthOptions['adapter'],
	providers: [
		GithubProvider({
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		})
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.image as string
			}

			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email
				},
				select: {
					id: true,
					name: true,
					email: true,
					image: true
				}
			})

			if (!dbUser) {
				if (user) {
					token.id = user?.id
				}
				return token
			}
			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				image: dbUser.image
			}
		}
	},
	pages: {
		signIn: '/'
	},
	session: {
		strategy: 'jwt'
	},
	secret: env.NEXTAUTH_SECRET
}

export const getSession = () => {
	return getServerSession(options)
}
