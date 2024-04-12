'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

import { LatLng } from './map-with-marker'

const Map = dynamic(() => import('./map-with-marker'), {
	ssr: false,
	loading: () => <Skeleton className="h-[321px] w-[668px]" />
})

type LocationPickerProps = {
	onLocationSelect: (lat: number, lng: number) => void
	initialLocation: LatLng | null
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
	onLocationSelect,
	initialLocation
}) => {
	const [markerPosition, setMarkerPosition] = useState<LatLng | null>(
		initialLocation
	)

	const handleLatLngSelect = (lat: number, lng: number) => {
		setMarkerPosition({ lat, lng })
		onLocationSelect(lat, lng)
	}

	return (
		<Map
			onLatLngSelect={handleLatLngSelect}
			initialMarkerPosition={markerPosition}
		/>
	)
}
