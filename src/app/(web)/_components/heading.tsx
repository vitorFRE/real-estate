import Link from 'next/link'

import { Icons } from '@/components/icons'

interface HeadingProps {
	title: string
	description: string
	href?: string
	hrefMessage?: string
}

/**
 * Reusable heading component to display a title and description,
 * optionally with a link.
 * @param {Object} props - The component props.
 * @param {string} title - The title to display.
 * @param {string} description - The description to display.
 * @param {string} [href] - The URL of the link (optional).
 * @param {string} [hrefMessage] - The text of the link (optional, required if href is provided).
 * @returns {JSX.Element} A JSX element representing the heading.
 */
export const Heading = ({
	description,
	title,
	href,
	hrefMessage
}: HeadingProps) => {
	return (
		<div className="flex flex-col items-start justify-between sm:flex-row">
			<div className="space-y-1">
				<h2 className="text-foregrounds text-2xl font-bold md:text-3xl">
					{title}
				</h2>
				<p className="max-w-[374px] text-muted-foreground ">{description}</p>
			</div>
			{href && hrefMessage && (
				<Link
					href={href}
					className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground sm:mt-0"
				>
					{hrefMessage} <Icons.arrowUpRight className="text-primary" />
				</Link>
			)}
		</div>
	)
}
