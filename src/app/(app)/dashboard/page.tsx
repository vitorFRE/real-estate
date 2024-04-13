import { Home } from 'lucide-react'

import { DashboardHeader } from '../_components/dashboard-header'

const Name = () => {
	return (
		<>
			<DashboardHeader title="Inicio" icon={Home} />
			<div className="mt-8 px-4 pb-12 pt-8 lg:mt-0">oi</div>
		</>
	)
}

export default Name
