import { useState } from 'react'

import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//@ts-expect-error: error
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow.src
})

export type LatLng = {
	lat: number
	lng: number
}

type MapWithMarkerProps = {
	onLatLngSelect: (lat: number, lng: number) => void
	initialMarkerPosition: LatLng | null
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({
	onLatLngSelect,
	initialMarkerPosition
}) => {
	const [mapCenter, setMapCenter] = useState<LatLng>(
		initialMarkerPosition || {
			lat: -18.5067469,
			lng: -54.7420286
		}
	)

	const [, setMarkerPosition] = useState<LatLng | null>(null)

	const MapEvents = () => {
		useMapEvents({
			click: (e: { latlng: { lat: number; lng: number } }) => {
				const { lat, lng } = e.latlng
				setMarkerPosition({ lat, lng })
				onLatLngSelect(lat, lng)
				setMapCenter({ lat, lng })
			}
		})
		return null
	}

	return (
		<MapContainer
			center={[mapCenter.lat, mapCenter.lng]}
			zoom={14}
			scrollWheelZoom={true}
			className="h-[35vh] rounded-lg"
		>
			<MapEvents />
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{initialMarkerPosition && (
				<Marker
					position={[initialMarkerPosition.lat, initialMarkerPosition.lng]}
				/>
			)}
		</MapContainer>
	)
}

export default MapWithMarker
