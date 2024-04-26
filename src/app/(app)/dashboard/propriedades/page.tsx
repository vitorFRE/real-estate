import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { Building2 } from 'lucide-react'

import 'dayjs/locale/pt-br'

import { DetailsPropertyCard } from '@/app/(web)/_components/cards'
import { getProperties } from '@/server/querries/get-properties'

import { DashboardHeader } from '../../_components/dashboard-header'

const Name = async () => {
	const properties = await getProperties({})

	dayjs.extend(utc)
	dayjs.extend(relativeTime)
	dayjs.locale('pt-br')

	return (
		<>
			<DashboardHeader title="Propriedades" icon={Building2} />
			<div className="mt-8 px-4 pb-12 pt-8 lg:mt-0">
				{properties.data ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
						{properties.data?.map((item) => (
							<DetailsPropertyCard
								id={item.id}
								imageUrl={item.images[0].url || ''}
								title={item.title}
								type={item.locationValue}
								key={item.title}
								price={item.price}
								updatedAt={dayjs(item?.updatedAt).format('HH:mm:ss DD-MM-YYYY')}
								createdAt={dayjs(item?.createdAt).format('HH:mm:ss DD-MM-YYYY')}
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
			</div>
		</>
	)
}

export default Name
