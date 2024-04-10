import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel'
import { getProperties } from '@/server/querries/get-properties'

import { FeedbackCard, PropertyCard, ServiceCard } from './_components/cards'
import { Heading } from './_components/heading'
import { feedbackData, servicesData } from './_constants/data'

const Name = async () => {
	const properties = await getProperties()
	return (
		<>
			{/* hero */}
			<section className="relative h-[350px] bg-hero bg-cover bg-center">
				<div className="absolute inset-0 bg-black opacity-5 dark:opacity-80"></div>
			</section>

			{/* listings */}
			<section className="container mt-10 md:mt-20">
				<Heading
					hrefMessage="Ver todas propriedades"
					href="/imoveis"
					title="Imóveis que talvez você goste!"
					description="Confira nossa seleção de imóveis que podem ser perfeitos para você"
				/>

				<Carousel
					opts={{
						align: 'start'
					}}
					className="mt-8 w-full md:mt-16"
				>
					<CarouselContent>
						{properties.data &&
							properties.data.map((property) => (
								<CarouselItem
									key={property.id}
									className="md:basis-1/2 lg:basis-1/3"
								>
									<div className=" p-1">
										<PropertyCard
											imgUrl={property.images[0].url || '/placeholder.svg'}
											type={property.locationValue}
											title={property.title}
											city={property.city}
											state={property.state}
											neighborhood={property.city}
											description={property.description}
											bedrooms={property.bedroomCount}
											bathrooms={property.bathroomCount}
											size={property.buildingArea}
										/>
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
				</Carousel>
			</section>

			{/* feedback */}
			<section className="container mt-10 md:mt-20">
				<Heading
					title="Avaliações dos clientes"
					description="Veja o que os nossos clientes tem a dizer"
				/>

				<Carousel
					opts={{
						align: 'start'
					}}
					className="mt-8 w-full md:mt-16"
				>
					<CarouselContent>
						{feedbackData.map((data, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className=" p-1">
									<FeedbackCard
										key={index}
										username={data.username}
										userAvatarUrl={data.userAvatarUrl}
										feedbackText={data.feedbackText}
										rating={data.rating}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</section>

			{/* services	 */}
			<section className="container mt-10 md:mt-20">
				<Heading
					title="Nossos Serviços"
					description="Veja os nossos serviços"
				/>
				<Carousel
					opts={{
						align: 'start'
					}}
					className="mt-8 w-full md:mt-16"
				>
					<CarouselContent>
						{servicesData.map((data, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<ServiceCard
										description={data.description}
										title={data.title}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</section>
		</>
	)
}

export default Name
