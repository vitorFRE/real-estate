import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel'

import { FeedbackCard, PropertyCard, ServiceCard } from './_components/cards'
import { Header } from './_components/header'
import { Heading } from './_components/heading'
import { TopBar } from './_components/top-bar'
import { feedbackData, servicesData } from './_constants/data'

const Name = () => {
	return (
		<>
			<TopBar />
			<Header />

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
						{Array.from({ length: 4 }).map((_, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className=" p-1">
									<PropertyCard
										imgUrl="/hero-img.jpg"
										type="Apartamento"
										title="Altas flores"
										city="Jardim das Flores"
										state="SP"
										neighborhood="Jardim das Flores"
										description="Localizada em uma das informações mais nobres de São Paulo, a Alta flores é uma propriedade incrivel que oferece o melhor em conforto e lazer."
										bedrooms={3}
										bathrooms={2}
										size={100}
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
