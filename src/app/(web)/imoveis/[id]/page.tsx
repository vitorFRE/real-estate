import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { Bath, BedDouble, BrickWall, PencilRuler } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { getProperties } from '@/server/querries/get-properties'
import { getPropertyById } from '@/server/querries/get-property-by-id'

import { MinimalPropertyCard } from '../../_components/cards'
import { ContactForm } from '../../_components/contact-form'
import { Heading } from '../../_components/heading'
import { ImageCarousel } from '../../_components/image-carousel'
import { ServicesSection } from '../../_components/sections/services-section'

const Map = dynamic(() => import('../../_components/map/map'), {
	ssr: false,
	loading: () => <Skeleton className="h-[500px] w-full" />
})

const Name = async ({ params }: { params: { id: string } }) => {
	const property = await getPropertyById({ id: params.id })
	const properties = await getProperties({ count: 3 })

	if (!property || !property.data) {
		notFound()
	}

	return (
		<>
			<div className="container mx-auto mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_384px]">
				<section>
					<h1 className="text-4xl font-semibold text-foreground">
						{property.data?.title}
					</h1>
					<p className="mb-6 text-2xl font-medium text-primary">
						{new Intl.NumberFormat('pt-br', {
							style: 'currency',
							currency: 'BRL'
						}).format(property.data.price / 100)}
					</p>
					<ImageCarousel images={property.data.images} />

					<h3 className="mb-3 mt-4 text-2xl font-semibold">
						Sobre esta proprieade
					</h3>
					<p className="font-medium text-muted-foreground">
						{property.data.description}
					</p>

					<div className="mt-6 flex flex-wrap gap-3">
						<div className="flex flex-col gap-2 rounded-sm border py-3 pl-4 pr-6">
							<BedDouble />
							<span className="text-sm">
								{property.data.bedroomCount} Quartos
							</span>
						</div>
						<div className="flex flex-col gap-2 rounded-sm border py-3 pl-4 pr-6">
							<Bath />
							<span className="text-sm">
								{property.data.bathroomCount} Banheiros
							</span>
						</div>
						<div className="flex flex-col gap-2 rounded-sm border py-3 pl-4 pr-6">
							<PencilRuler />
							<span className="text-sm">{property.data.area} Area</span>
						</div>
						<div className="flex flex-col gap-2 rounded-sm border py-3 pl-4 pr-6">
							<PencilRuler />
							<span className="text-sm">
								{property.data.buildingArea} Area construida
							</span>
						</div>
						<div className="flex flex-col gap-2 rounded-sm border py-3 pl-4 pr-6">
							<BrickWall />
							<span className="text-sm">
								{property.data.bathroomCount} Peças ao todo
							</span>
						</div>
					</div>

					<div className="mt-6">
						<h3 className="mb-3 text-2xl font-semibold">Onde fica</h3>
						<Map items={[property.data]} />
					</div>
				</section>

				<aside>
					<div className="sticky right-0 top-[73px]">
						<ContactForm />
					</div>
				</aside>
			</div>

			<ServicesSection />

			<div className="container mx-auto mt-20">
				<Heading
					title="Talvez você goste"
					description="Vejas algumas propriedades"
				/>
				<div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
					{properties.data?.map((item) => (
						<MinimalPropertyCard
							description={item.description}
							id={item.id}
							imageUrl={item.images[0].url || ''}
							price={item.price}
							title={item.title}
							key={item.title}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Name
