import { notFound } from 'next/navigation'

import { Edit } from 'lucide-react'

import { DashboardHeader } from '@/app/(app)/_components/dashboard-header'
import { EditPropertyForm } from '@/app/(app)/_components/forms/edit-property-form'
import { getPropertyById } from '@/server/querries/get-property-by-id'

const Name = async ({ params }: { params: { id: string } }) => {
	const property = await getPropertyById({ id: params.id })

	if (!property || !property.data) {
		notFound()
	}

	return (
		<>
			<DashboardHeader title="Editar" icon={Edit} />
			<div className="mx-auto max-w-[700px] px-4 py-8">
				<EditPropertyForm property={property.data} />
			</div>
		</>
	)
}

export default Name
