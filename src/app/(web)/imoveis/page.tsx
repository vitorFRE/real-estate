import { Button } from '@/components/ui/button'
import { getProperties } from '@/server/querries/get-properties'

import { PropertyCard } from '../_components/cards'
import { Heading } from '../_components/heading'
import ListingsFilter from '../_components/listings-filter'

const ImoveisPage = async () => {
	const properties = await getProperties({ visible: true })

	return (
		<main>
			<div className="relative h-[206px] bg-hero bg-cover bg-center">
				<div className="absolute inset-0 bg-black opacity-5 dark:opacity-80" />
			</div>

			<section className="container mt-10 md:mt-20">
				<div className="flex justify-between">
					<Heading
						title="Nossa seleção de propriedades esperando por você"
						description="Confira nossa seleção de imóveis que podem ser perfeitos para você"
					/>
					<ListingsFilter />
				</div>

				{properties.data ? (
					<div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
						{properties.data.map((property) => (
							<PropertyCard
								key={property.id}
								id={property.id}
								imgUrl={property.images[0].url || '/placeholder.svg'}
								type={property.locationValue}
								title={property.title}
								city={property.city}
								state={property.state}
								neighborhood={property.neighborhood}
								description={property.description}
								bedrooms={property.bedroomCount}
								bathrooms={property.bathroomCount}
								size={property.buildingArea}
								isNew={property.createdAt}
							/>
						))}
					</div>
				) : (
					<div className="mt-8 flex w-full flex-col items-center gap-4">
						<p className="max-w-md text-center text-muted-foreground">
							<span className="text-foreground">Ops</span>, parece que não temos
							propriedades disponíveis, tem alguma para vender? Anuncie aqui!
						</p>
						<Button>Venda Conosco!</Button>
					</div>
				)}
			</section>
		</main>
	)
}

export default ImoveisPage
