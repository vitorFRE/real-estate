import { Plus } from 'lucide-react'

import { DashboardHeader } from '../../_components/dashboard-header'
import { CreatepropertyForm } from '../../_components/forms/create-property-form'

const Name = () => {
	return (
		<>
			<DashboardHeader title="Adicionar" icon={Plus} />
			<div className="mx-auto max-w-[700px] px-4 py-8">
				<CreatepropertyForm />
			</div>
		</>
	)
}

export default Name
