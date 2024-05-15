import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { Building2, Eye, Home, Plus } from 'lucide-react'

import { DetailsPropertyCard } from '@/app/(web)/_components/cards'
import { DashboardCard } from '@/app/(web)/_components/dashboard-card'
import { getProperties } from '@/server/querries/get-properties'

import { DashboardHeader } from '../_components/dashboard-header'

const Name = async () => {
	const properties = await getProperties({})

	dayjs.extend(utc)
	dayjs.extend(relativeTime)
	dayjs.locale('pt-br')

	const recentproperties = properties.data?.filter((property) => {
		const diffdateDays = dayjs().diff(dayjs(property.createdAt), 'day')
		return diffdateDays < 15
	})

	const visibleproperties = properties.data?.filter(
		(property) => property.visibility
	)

	return (
		<>
			<DashboardHeader title="Inicio" icon={Home} />
			<section className="mt-8 px-4 pb-12 pt-8 lg:mt-0">
				<div className="grid grid-cols-3 gap-4">
					<DashboardCard
						Icon={Building2}
						title="Total de propriedades"
						content={`${properties.data?.length || 0}`}
						description="Total de propriedades disponíveis"
					/>
					<DashboardCard
						Icon={Eye}
						title="Propriedades Visíveis"
						content={`${visibleproperties?.length || 0}`}
						description="Número de propriedades atualmente visíveis"
					/>
					<DashboardCard
						Icon={Plus}
						title={`Novas propriedades`}
						content={`${recentproperties?.length || 0}`}
						description="Novas propriedades nos ultimos 15 dias"
					/>
				</div>
				{properties.data ? (
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
						{properties.data
							?.slice(0, 6)
							.map((item) => (
								<DetailsPropertyCard
									id={item.id}
									imageUrl={item.images[0].url || ''}
									title={item.title}
									type={item.locationValue}
									key={item.title}
									price={item.price}
									updatedAt={dayjs(item?.updatedAt).format(
										'HH:mm:ss DD-MM-YYYY'
									)}
									createdAt={dayjs(item?.createdAt).format(
										'HH:mm:ss DD-MM-YYYY'
									)}
									status={item.visibility}
								/>
							))}
					</div>
				) : (
					<div className="mt-8 flex w-full flex-col items-center gap-4">
						<p className="max-w-md text-center text-muted-foreground">
							<span className="text-foreground">Ops</span>, parece que não temos
							propriedades disponíveis!
						</p>
					</div>
				)}
			</section>
		</>
	)
}

export default Name
