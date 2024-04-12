import { ChevronDown, FilterIcon } from 'lucide-react'

import { InputCounter } from '@/components/form/input-counter'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getProperties } from '@/server/querries/get-properties'

import { PropertyCard } from '../_components/cards'
import { Heading } from '../_components/heading'
import { FormInputMask } from '../../../components/form/input-mask'

const ImoveisPage = async () => {
	const properties = await getProperties()
	return (
		<section>
			<div className="relative h-[206px] bg-hero bg-cover bg-center">
				<div className="absolute inset-0 bg-black opacity-5 dark:opacity-80" />
			</div>

			<section className="container mt-10 md:mt-20">
				<div className="flex justify-between">
					<Heading
						title="Nossa seleção de propriedades esperando por você"
						description="Confira nossa seleção de imóveis que podem ser perfeitos para você"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="flex items-center" variant="outline">
								<FilterIcon className="mr-2 h-4 w-4" />
								Filtros
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" className="max-w-[350px]">
							<div className="space-y-4">
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											className="flex w-full items-center justify-between"
											variant="ghost"
										>
											Área
											<ChevronDown className="ml-auto h-4 w-4" />
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="mt-2 flex flex-col gap-2 px-4 md:flex-row">
											<FormInputMask mask="meters" placeholder="m² Máximo" />
											<FormInputMask mask="meters" placeholder="m² Mínimo" />
										</div>
									</CollapsibleContent>
								</Collapsible>
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											className="flex w-full items-center justify-between"
											variant="ghost"
										>
											Valor
											<ChevronDown className="ml-auto h-4 w-4" />
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="mt-2 flex flex-col gap-2 px-4 md:flex-row">
											<FormInputMask mask="money" placeholder="R$ Máximo" />
											<FormInputMask mask="money" placeholder="R$ Mínimo" />
										</div>
									</CollapsibleContent>
								</Collapsible>
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											className="flex w-full items-center justify-between"
											variant="ghost"
										>
											Tipo de Casa
											<ChevronDown className="ml-auto h-4 w-4" />
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="mt-2 flex flex-col gap-4">
											<div className="flex items-center gap-1 px-4">
												<Checkbox id="all" />
												<label htmlFor="all" className="text-sm font-medium">
													Todas
												</label>
											</div>
											<div className="flex items-center gap-1 px-4">
												<Checkbox id="home" />
												<label htmlFor="home" className="text-sm font-medium">
													Casa
												</label>
											</div>
											<div className="flex items-center gap-1 px-4">
												<Checkbox id="apartment" />
												<label
													htmlFor="apartment"
													className="text-sm font-medium"
												>
													Apartamento
												</label>
											</div>
											<div className="flex items-center gap-1 px-4">
												<Checkbox id="condo" />
												<label htmlFor="condo" className="text-sm font-medium">
													Condomínio
												</label>
											</div>
										</div>
									</CollapsibleContent>
								</Collapsible>
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											className="flex w-full items-center justify-between"
											variant="ghost"
										>
											Características do Imóvel
											<ChevronDown className="ml-auto h-4 w-4" />
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="mt-2 flex flex-col gap-4">
											<div>
												<InputCounter />
												<DropdownMenuSeparator />
												<InputCounter />
											</div>
										</div>
									</CollapsibleContent>
								</Collapsible>
							</div>
							<DropdownMenuSeparator />
							<Button className="w-full">Aplicar filtros</Button>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{properties.data ? (
					<div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
						{properties.data.map((property) => (
							<PropertyCard
								key={property.id}
								imgUrl={property.images[0].url || '/placeholder.svg'}
								type={property.locationValue}
								title={property.title}
								city={property.city}
								state={property.state}
								neighborhood={property.neighborhood}
								description={property.description}
								bedrooms={property.bedroomCount}
								bathrooms={property.bathroomCount}
								size={property.buildingArea}
							/>
						))}
					</div>
				) : (
					<div className="mt-8 flex w-full flex-col items-center gap-4">
						<p className="max-w-md text-center text-muted-foreground">
							<span className="text-foreground">Ops</span>, para quem não temos
							propriedades disponíveis, tem alguma para vender? Anuncie aqui!
						</p>
						<Button>Venda Conosco!</Button>
					</div>
				)}

				<div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
					{properties.data &&
						properties.data.map((property) => (
							<PropertyCard
								key={property.id}
								imgUrl={property.images[0].url || '/placeholder.svg'}
								type={property.locationValue}
								title={property.title}
								city={property.city}
								state={property.state}
								neighborhood={property.city}
								description={property.description}
								bedrooms={property.bedroomCount}
								bathrooms={property.bathroomCount}
								size={property.buildingArea}
							/>
						))}
				</div>
			</section>
		</section>
	)
}

export default ImoveisPage
