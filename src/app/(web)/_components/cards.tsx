'use client'

import Image from 'next/image'
import Link from 'next/link'

import { BedDouble, LandPlot, MapPin, ShowerHead, Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

interface PropertyCardProps {
	imgUrl: string
	type: string
	title: string
	city: string
	state: string
	neighborhood: string
	description: string
	bedrooms: number
	bathrooms: number
	size: string
	id: string
}

export const PropertyCard = (props: PropertyCardProps) => {
	return (
		<Card>
			<Link href={`/imoveis/${props.id}`}>
				<CardHeader className="relative h-[220px]">
					<Image
						alt="s"
						className="rounded-t-lg object-cover"
						fill
						src={props.imgUrl}
					/>
				</CardHeader>
				<CardContent>
					<div className="mt-4 flex flex-col gap-2">
						<span className="text-xs font-medium text-muted-foreground ">
							{props.type}
						</span>
						<h3 className="text-lg font-semibold">{props.title}</h3>
						<p className="flex items-center gap-1 text-muted-foreground/80">
							<MapPin className="text-foreground" /> {props.neighborhood},{' '}
							{props.city} - {props.state}
						</p>
					</div>
					<p className="mt-4 line-clamp-4 h-[96px] text-muted-foreground">
						{props.description}
					</p>
				</CardContent>
				<CardFooter className="flex items-center gap-4">
					<span className="flex items-center gap-2 text-foreground/70">
						<BedDouble className="text-foreground" /> {props.bedrooms}
					</span>
					<span className="flex items-center gap-2 text-foreground/70">
						<ShowerHead className="text-foreground" /> {props.bathrooms}
					</span>
					<span className="flex items-center gap-2 text-foreground/70">
						<LandPlot className="text-foreground" />
						{props.size}
					</span>
				</CardFooter>
			</Link>
		</Card>
	)
}

interface FeedbackCardProps {
	username: string
	userAvatarUrl: string
	feedbackText: string
	rating: number
}

export const FeedbackCard = (props: FeedbackCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Perfeito</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{props.feedbackText}</CardDescription>
				<div className="mt-2 flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, index) => (
						<Star key={index} className="fill-primary text-primary" />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-start">
				<hr className="w-full border" />
				<div className="mt-6 flex items-center gap-2">
					<Avatar>
						<AvatarImage src={props.userAvatarUrl} />
						<AvatarFallback>
							{props.username.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium text-foreground">
							{props.username}
						</span>
						<p className="text-sm font-medium text-muted-foreground">
							Anunciante
						</p>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

interface ServiceCardProps {
	title: string
	description: string
}

export const ServiceCard = ({ description, title }: ServiceCardProps) => {
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-base">{description}</CardDescription>
			</CardContent>
		</Card>
	)
}

interface MinimalPropertyCardProps {
	title: string
	description: string
	price: string
	imageUrl: string
	id: string
}

export const MinimalPropertyCard = (props: MinimalPropertyCardProps) => {
	return (
		<div className="grid h-full grid-cols-[140px_1fr] rounded border">
			<Link href={`/imoveis/${props.id}`}>
				<picture className=" w-full max-w-36">
					<img
						src={props.imageUrl}
						alt=""
						className="h-full rounded-l object-cover"
					/>
				</picture>
			</Link>
			<div className="p-4">
				<h2 className="font-semibold text-foreground">{props.title}</h2>
				<p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
					{props.description}
				</p>
				<span className="text-sm font-medium text-primary">{props.price}</span>
			</div>
		</div>
	)
}
