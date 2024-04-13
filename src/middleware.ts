import { createMiddleware } from './lib/middleware'
import { authorizationMiddleware } from './middlewares/authorization'

export default createMiddleware('sequence', {
	'*': [authorizationMiddleware]
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
