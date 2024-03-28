export const env = {
	NODE_ENV: process.env.NODE_ENV as string,
	VERCEL_URL: process.env.VERCEL_URL as string,
	DATABASE_URL: process.env.DATABASE_URL as string,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string
}
