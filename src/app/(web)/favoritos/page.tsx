import { getFavoriteProperties } from '@/server/querries/get-favorite-properties'

import { PropertyCard } from '../_components/cards'
import { Heading } from '../_components/heading'

const Name = async () => {
	const favorites = await getFavoriteProperties()

	return (
		<main className="container mx-auto">
			<div className="mt-10 md:mt-20">
				<Heading
					title="Seus Favoritos"
					description="Propriedades que você favoritou!"
				/>
			</div>

			<section>
				{favorites.data ? (
					<div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
						{favorites.data.map((property) =>
							property.Property ? (
								<PropertyCard
									key={property.Property.id}
									id={property.Property.id}
									imgUrl={property.Property.images[0].url || '/placeholder.svg'}
									type={property.Property.locationValue}
									title={property.Property.title}
									city={property.Property.city}
									state={property.Property.state}
									neighborhood={property.Property.neighborhood}
									description={property.Property.description}
									bedrooms={property.Property.bedroomCount}
									bathrooms={property.Property.bathroomCount}
									size={property.Property.buildingArea}
									isNew={property.Property.createdAt}
								/>
							) : null
						)}
					</div>
				) : (
					<div className="mt-8 flex w-full flex-col items-center gap-4">
						<p className="max-w-md text-center text-muted-foreground">
							<span className="text-foreground">Ops</span>, parece que você
							ainda não selecionou propriedades favoritas
						</p>
					</div>
				)}
			</section>
		</main>
	)
}

export default Name
