'use client'

import Link from 'next/link'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import {
	BedDouble,
	LandPlot,
	MapPin,
	MoreVertical,
	ShowerHead,
	Star
} from 'lucide-react'

import { FavoriteButton } from '@/components/favorite-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useDeleteProperty } from '@/hooks/use-delete-property'

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
	size: number
	id: string
	isNew: Date
}

export const PropertyCard = (props: PropertyCardProps) => {
	dayjs.extend(utc)
	dayjs.extend(relativeTime)
	dayjs.locale('pt-br')

	const dateNow = dayjs(new Date())
	const diffDateDays = dateNow.diff(props.isNew, 'day')

	return (
		<Card>
			<CardHeader className="relative h-[220px]">
				<Link
					href={`/imoveis/${props.id}`}
					className="absolute left-0 right-0 top-0  overflow-hidden"
				>
					<picture className="h-full w-full rounded-t-lg">
						<img
							className="h-[220px] w-full rounded-t-lg object-cover transition-all duration-300 hover:scale-105"
							src={props.imgUrl}
							alt={`Imagem da casa ${props.title}`}
						/>
					</picture>
				</Link>

				<FavoriteButton
					propertyId={props.id}
					className="absolute right-2 top-0"
				/>
				{diffDateDays <= 15 && (
					<Badge className="absolute left-2 top-0">Novidade</Badge>
				)}
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
	price: number
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
				<span className="text-sm font-medium text-primary">
					{new Intl.NumberFormat('pt-br', {
						style: 'currency',
						currency: 'BRL'
					}).format(props.price / 100)}
				</span>
			</div>
		</div>
	)
}

interface DetailsPropertyCardProps {
	id: string
	imageUrl: string
	title: string
	type: string
	price: number
	createdAt: string
	updatedAt: string
	status?: boolean
}

export const DetailsPropertyCard = (props: DetailsPropertyCardProps) => {
	const { onDelete, isLoading } = useDeleteProperty()

	const deleteProperty = async (propertyId: string) => {
		await onDelete(propertyId)
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<Link href={`/imoveis/${props.id}`}>
							<picture className="w-full max-w-16 rounded-sm">
								<img
									src={props.imageUrl}
									alt=""
									className="h-20 w-32 object-cover"
								/>
							</picture>
						</Link>
						<div>
							<h3 className="text-lg font-semibold">{props.title}</h3>
							<span className="text-muted-foreground">{props.type}</span>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'outline'} size={'icon'}>
								<MoreVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem asChild>
								<Link className="cursor-pointer" href={`/imoveis/${props.id}`}>
									Ver
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link
									className="cursor-pointer"
									href={`/dashboard/editar/${props.id}`}
								>
									Editar
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer text-red-500"
								onClick={() => deleteProperty(props.id)}
							>
								{isLoading ? 'Deletando' : 'Deletar'}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<Separator className="mb-4" />
			<CardContent>
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-col gap-1 text-sm text-muted-foreground">
						Visibilidade
						<Badge
							variant={props.status ? 'default' : 'destructive'}
							className="w-min"
						>
							{props.status ? 'Visivel' : 'Oculto'}
						</Badge>
					</div>
					<div className="flex flex-col gap-1 text-sm text-muted-foreground">
						Preço
						<span className="text-base text-foreground">
							{new Intl.NumberFormat('pt-br', {
								style: 'currency',
								currency: 'BRL'
							}).format(props.price / 100)}
						</span>
					</div>
					<div className="flex flex-col gap-1 text-sm text-muted-foreground">
						Criado em
						<span className="text-base text-foreground">{props.createdAt}</span>
					</div>
					<div className="flex flex-col gap-1 text-sm text-muted-foreground">
						Ultima atualização
						<span className="text-base text-foreground">{props.updatedAt}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
