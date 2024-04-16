'use client'

import { Media, Property } from '@prisma/client'
import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import Pin from './pin'

interface MapProps {
	items: (Property & { images: Media[] })[]
}

function Map({ items }: MapProps) {
	return (
		<MapContainer
			center={
				items.length === 1
					? [items[0].latitude, items[0].longitude]
					: [82.2132, -8.38192]
			}
			zoom={16}
			scrollWheelZoom={false}
			className="h-[500px] rounded-lg"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{items.map((item) => (
				<Pin item={item} key={item.id} />
			))}
		</MapContainer>
	)
}

export default Map
