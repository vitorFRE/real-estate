import { NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import { env } from '@/environment/env'

export const authorizationMiddleware = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname

	const token = await getToken({
		req: request,
		secret: env.NEXTAUTH_SECRET
	})

	if (token && pathname === '/login') {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (
		token?.role !== 'ADMIN' &&
		token?.role !== 'AGENT' &&
		pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!token && pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	console.log(`[Authorization Middleware] Log from [Path] ${pathname}`)
}
