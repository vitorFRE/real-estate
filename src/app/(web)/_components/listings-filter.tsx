'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, FilterIcon } from 'lucide-react'
import qs from 'query-string'
import { Controller, useForm } from 'react-hook-form'

import { FormInputMask } from '@/components/form/input-mask'
import { Button } from '@/components/ui/button'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { removeNonNumericChars } from '@/lib/utils'

import {
	FilterFormData,
	FilterFormDTO
} from '../_validations/filter-form-schema'

const ListingsFilter = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FilterFormData>({
		resolver: zodResolver(FilterFormDTO),
		defaultValues: {
			type: searchParams.get('type') || undefined,
			areaMin: searchParams.get('areaMin') || undefined,
			areaMax: searchParams.get('areaMax') || undefined,
			moneyMin: searchParams.get('moneyMin') || undefined,
			moneyMax: searchParams.get('moneyMax') || undefined
		}
	})

	const hasParams =
		searchParams.has('type') ||
		searchParams.has('areaMin') ||
		searchParams.has('areaMax') ||
		searchParams.has('moneyMin') ||
		searchParams.has('moneyMax')
	const clearFilters = () => {
		router.push('/imoveis')
	}

	const handleFilter = (data: FilterFormData) => {
		const cleanedData = {
			...data,
			areaMax: data.areaMax ? removeNonNumericChars(data.areaMax) : undefined,
			areaMin: data.areaMin ? removeNonNumericChars(data.areaMin) : undefined,
			moneyMin: data.moneyMin
				? removeNonNumericChars(data.moneyMin)
				: undefined,
			moneyMax: data.moneyMax ? removeNonNumericChars(data.moneyMax) : undefined
		}

		const queryString = qs.stringify(cleanedData, {
			skipNull: true,
			skipEmptyString: true
		})
		const url = qs.stringifyUrl(
			{
				url: '/imoveis',
				query: qs.parse(queryString)
			},
			{ skipNull: true }
		)
		router.push(url)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="flex items-center" variant="outline">
					<FilterIcon className="mr-2 h-4 w-4" />
					Filtros
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" className="w-full max-w-[350px] ">
				<div className="mb-4 space-y-4">
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
								<FormInputMask
									mask="meters"
									placeholder="m² Máximo"
									{...register('areaMax')}
								/>
								<FormInputMask
									mask="meters"
									placeholder="m² Mínimo"
									{...register('areaMin')}
								/>
							</div>
							{errors && (
								<div className="mx-4">
									<span className=" text-sm text-red-500">
										{errors.areaMax?.message}
									</span>
								</div>
							)}
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
								<FormInputMask
									mask="money"
									placeholder="R$ Máximo"
									{...register('moneyMax')}
								/>
								<FormInputMask
									mask="money"
									placeholder="R$ Mínimo"
									{...register('moneyMin')}
								/>
							</div>
							{errors && (
								<div className="mx-4">
									<span className="text-sm text-red-500">
										{errors.moneyMax?.message}
									</span>
								</div>
							)}
						</CollapsibleContent>
					</Collapsible>
					<div className="mx-4">
						<Controller
							control={control}
							name="type"
							render={({ field }) => {
								return (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o tipo" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Tipo</SelectLabel>
												<SelectItem value="casa">Casa</SelectItem>
												<SelectItem value="apartamento">Apartamento</SelectItem>
												<SelectItem value="condominio">Condomínio</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)
							}}
						/>
					</div>
				</div>
				<DropdownMenuSeparator />

				{hasParams && (
					<Button
						variant={'destructive'}
						className="mt-2 w-full"
						onClick={clearFilters}
					>
						Limpar filtros
					</Button>
				)}
				<Button
					className="mb-1 mt-2 w-full"
					onClick={handleSubmit(handleFilter)}
				>
					Aplicar filtros
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ListingsFilter
