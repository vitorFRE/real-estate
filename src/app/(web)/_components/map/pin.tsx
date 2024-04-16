'use client'

import Link from 'next/link'

import { Media, Property } from '@prisma/client'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Bath, BedDouble } from 'lucide-react'
import { Marker, Popup } from 'react-leaflet'

export interface PinProps {
	item: Property & { images: Media[] }
}

//@ts-expect-error: error
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow.src
})

function Pin({ item }: PinProps) {
	return (
		<Marker position={[item.latitude, item.longitude]}>
			<Popup>
				<div className="flex  w-[350px]  gap-5">
					<picture>
						<img
							src={item.images[0].url || ''}
							alt=""
							className="h-full w-28 rounded-sm object-cover"
						/>
					</picture>
					<div className="flex flex-col justify-between">
						<Link href={`/imoveis/${item.id}`}>{item.title}</Link>
						<div className="flex gap-2">
							<span className="flex items-center gap-2 ">
								<BedDouble /> {item.bedroomCount}
							</span>
							<span className="flex items-center gap-2 ">
								<Bath /> {item.bathroomCount}
							</span>
						</div>
						<b className="font-medium">{item.price}</b>
					</div>
				</div>
			</Popup>
		</Marker>
	)
}

export default Pin
