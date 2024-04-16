'use client'

import React, { useState } from 'react'

import { Media } from '@prisma/client'

import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel'

interface ImageCarouselProps {
	images: Media[]
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
	const [selectedImage, setSelectedImage] = useState<string>(
		images[0].url || ''
	)

	const handleClick = (image: string) => {
		setSelectedImage(image)
	}

	return (
		<div>
			<picture>
				<img
					className="max-h-[438px] w-full rounded object-cover"
					src={selectedImage}
					alt="Main"
				/>
			</picture>

			<Carousel opts={{ align: 'start' }} className="mt-4 w-full">
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
							<picture key={index}>
								<img
									src={image.url || ''}
									alt={`Thumbnail ${index}`}
									className="h-[86px] w-[160px] cursor-pointer rounded object-cover"
									onClick={() => handleClick(image.url || '')}
								/>
							</picture>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
