import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel'

import { servicesData } from '../../_constants/data'
import { ServiceCard } from '../cards'
import { Heading } from '../heading'

export const ServicesSection = () => {
	return (
		<section className="container mt-10 md:mt-20">
			<Heading title="Nossos Serviços" description="Veja os nossos serviços" />
			<Carousel
				opts={{
					align: 'start'
				}}
				className="mt-8w-full md:mt-16"
			>
				<CarouselContent>
					{servicesData.map((data, index) => (
						<CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
							<div className="h-full p-1">
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
	)
}
