'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<section className="bg-site flex h-screen w-full flex-col items-center justify-center">
			<h1 className="text-9xl font-extrabold tracking-widest text-white">
				404
			</h1>
			<div className="text-site absolute rotate-12 rounded bg-yellow-400 px-2 text-sm">
				Página não encontrada
			</div>

			<button className="mt-5">
				<div className="group relative inline-block text-sm font-medium text-yellow-400 focus:outline-none focus:ring active:text-yellow-500">
					<span className="bg-blue-600group-hover:translate-y-0 absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform group-hover:translate-x-0"></span>

					<Link
						className="bg-site hover:bg-site-primary hover:text-site relative block border border-current px-8 py-3 transition-all"
						href="/"
					>
						Voltar
					</Link>
				</div>
			</button>
		</section>
	)
}
