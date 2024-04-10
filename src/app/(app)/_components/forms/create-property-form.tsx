'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Building, Building2, Home } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormLabel,
	FormTextarea
} from '@/components/form/form'
import { FormInputMask } from '@/components/form/input-mask'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCreateProperty } from '@/hooks/use-create-property'

export const CreatePropertyDTO = z.object({
	title: z.string().min(1, {
		message: 'O titulo deve conter pelo menos um caractere.'
	}),
	locationValue: z.string({
		required_error: 'Por favor selecione o tipo do imovel.'
	}),
	price: z.string().min(1, {
		message: 'O preço deve conter pelo menos um caractere.'
	}),
	description: z.string().min(1, {
		message: 'A descrição deve conter pelo menos um caractere.'
	}),
	bedroomCount: z
		.number()
		.min(1, {
			message: 'O número de quartos deve conter pelo menos um caractere.'
		})
		.max(30, {
			message: 'O número de quartos não pode ser maior que 30.'
		}),
	bathroomCount: z
		.number()
		.min(1, {
			message: 'O número de banheiros deve conter pelo menos um caractere.'
		})
		.max(20, {
			message: 'O número de banheiros não pode ser maior que 20.'
		}),
	city: z.string().min(2, {
		message: 'A cidade deve conter pelo menos dois caractere.'
	}),
	state: z
		.string()
		.min(2, {
			message: 'O estado deve conter pelo menos dois caractere.'
		})
		.max(2, {
			message: 'O estado deve conter no maximo dois caractere.'
		}),
	area: z.string().min(1, {
		message: 'A area deve conter pelo menos um caractere.'
	}),
	buildingArea: z.string().min(1, {
		message: 'A area construida deve conter pelo menos um caractere.'
	}),
	latitude: z.number().min(1, {
		message: 'A latitude deve conter pelo menos um caractere.'
	}),
	longitude: z.number().min(1, {
		message: 'A longitude deve conter pelo menos um caractere.'
	}),
	media: z.custom<FileList>().optional().nullable()
})

export type CreatePropertyData = z.infer<typeof CreatePropertyDTO>

export const CreatepropertyForm = () => {
	const { data: session } = useSession()

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		watch,
		formState: { errors }
	} = useForm<CreatePropertyData>({
		resolver: zodResolver(CreatePropertyDTO),
		defaultValues: {
			latitude: 32131231321,
			longitude: 3213919321
		}
	})

	const { create: createProperty } = useCreateProperty()

	const onSubmit = async (data: CreatePropertyData) => {
		await createProperty({ data, userId: session?.user.id as string })
		reset()
	}

	const watchMedia = watch('media')

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-6">
				<Controller
					control={control}
					name="locationValue"
					render={({ field }) => {
						return (
							<div>
								<FormLabel>Tipo</FormLabel>
								<RadioGroup
									className="flex max-w-md gap-8 pt-2"
									onValueChange={field.onChange}
								>
									<FormGroup>
										<FormLabel className="flex flex-col items-center ">
											<RadioGroupItem value="casa" className="sr-only" />
											<div
												className={`flex h-24 w-28 items-center justify-center rounded-md border-2 border-muted p-1  ${
													getValues('locationValue') === 'casa'
														? 'border-primary'
														: ''
												}`}
											>
												<Home size={32} />
											</div>
											<span className="block p-2">Casa</span>
										</FormLabel>
									</FormGroup>
									<FormGroup>
										<FormLabel className="flex flex-col items-center">
											<RadioGroupItem value="apartamento" className="sr-only" />
											<div
												className={`flex h-24 w-28 items-center justify-center rounded-md border-2 border-muted p-1  ${
													getValues('locationValue') === 'apartamento'
														? 'border-primary'
														: ''
												}`}
											>
												<Building size={32} />
											</div>
											<span className="block p-2">Apartamento</span>
										</FormLabel>
									</FormGroup>
									<FormGroup>
										<FormLabel className="flex flex-col items-center">
											<RadioGroupItem value="condominio" className="sr-only" />
											<div
												className={`flex h-24 w-28 items-center justify-center rounded-md border-2 border-muted p-1  ${
													getValues('locationValue') === 'condominio'
														? 'border-primary'
														: ''
												}`}
											>
												<Building2 size={32} />
											</div>
											<span className="block p-2">Condomínio</span>
										</FormLabel>
									</FormGroup>
								</RadioGroup>
								{errors.locationValue && (
									<span className="text-red-500">
										{errors.locationValue.message}
									</span>
								)}
							</div>
						)
					}}
				/>

				<FormGroup>
					<FormLabel htmlFor="title">Titulo</FormLabel>
					<FormInput
						className="mt-1"
						type="text"
						id="title"
						placeholder="Titulo do imovel"
						{...register('title')}
					/>
					{errors.title && (
						<span className="text-red-500">{errors.title.message}</span>
					)}
				</FormGroup>

				<FormGroup>
					<FormLabel htmlFor="price">Preço</FormLabel>
					<FormInputMask
						mask="money"
						className="mt-1"
						type="text"
						id="price"
						placeholder="R$ 0,00"
						{...register('price')}
					/>
					{errors.price && (
						<span className="text-red-500">{errors.price.message}</span>
					)}
				</FormGroup>

				<FormGroup>
					<FormLabel htmlFor="description">Descrição</FormLabel>
					<FormTextarea
						className="mt-1"
						id="description"
						placeholder="Descrição da propriedade"
						{...register('description')}
					/>
					{errors.description && (
						<span className="text-red-500">{errors.description.message}</span>
					)}
				</FormGroup>

				<FormGroup>
					<FormLabel htmlFor="bedroomCount">Numero de quartos</FormLabel>
					<FormInput
						className="mt-1"
						type="number"
						id="bedroomCount"
						placeholder="0"
						{...register('bedroomCount', { valueAsNumber: true })}
					/>
					{errors.bedroomCount && (
						<span className="text-red-500">{errors.bedroomCount.message}</span>
					)}
				</FormGroup>

				<FormGroup>
					<FormLabel htmlFor="bathroomCount">Numero de banheiros</FormLabel>
					<FormInput
						className="mt-1"
						id="bathroomCount"
						type="number"
						placeholder="0"
						{...register('bathroomCount', { valueAsNumber: true })}
					/>
					{errors.bathroomCount && (
						<span className="text-red-500">{errors.bathroomCount.message}</span>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="city">Cidade</FormLabel>
					<FormInput
						className="mt-1"
						id="city"
						type="text"
						placeholder="São Paulo"
						{...register('city')}
					/>
					{errors.city && (
						<span className="text-red-500">{errors.city.message}</span>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="state">Estado</FormLabel>
					<FormInput
						className="mt-1"
						id="state"
						type="text"
						placeholder="SP"
						{...register('state')}
					/>
					{errors.state && (
						<span className="text-red-500">{errors.state.message}</span>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="area">Area</FormLabel>
					<FormInputMask
						mask="meters"
						className="mt-1"
						type="text"
						id="area"
						placeholder="m² 200"
						{...register('area')}
					/>
					{errors.area && (
						<span className="text-red-500">{errors.area.message}</span>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="buildingArea">Area</FormLabel>
					<FormInputMask
						mask="meters"
						className="mt-1"
						type="text"
						id="buildingArea"
						placeholder="m² 300"
						{...register('buildingArea')}
					/>
					{errors.buildingArea && (
						<span className="text-red-500">{errors.buildingArea.message}</span>
					)}
				</FormGroup>

				<FormGroup>
					<FormLabel
						htmlFor="logo"
						className="block w-full max-w-md overflow-hidden rounded-md border"
					>
						<div className="mt-2 grid grid-cols-3 gap-4">
							{Array.from(watchMedia || []).map((file, index) => (
								<picture key={index}>
									<img
										src={URL.createObjectURL(file) || 'placeholder.svg'}
										alt={`Imagem ${index + 1}`}
										className="h-24 w-full rounded-md object-cover"
									/>
								</picture>
							))}
						</div>

						<FormInput
							id="logo"
							type="file"
							className="hidden"
							multiple
							{...register('media')}
						/>
					</FormLabel>
				</FormGroup>
			</div>
			<FormGroup className="mt-6">
				<FormButton type="submit" className="w-full">
					criar
				</FormButton>
			</FormGroup>
		</Form>
	)
}
