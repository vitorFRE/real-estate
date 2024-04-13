'use client'

import { ChevronDown, FilterIcon } from 'lucide-react'

import { InputCounter } from '@/components/form/input-counter'
import { FormInputMask } from '@/components/form/input-mask'
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

const ListingsFilter = () => {
	return (
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
									<label htmlFor="apartment" className="text-sm font-medium">
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
	)
}

export default ListingsFilter
