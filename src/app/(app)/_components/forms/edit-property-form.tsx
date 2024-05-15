'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Media, Property } from '@prisma/client'
import { Building, Building2, FileUp, Home } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Dropzone from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'

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
import { Switch } from '@/components/ui/switch'
import { useEditProperty } from '@/hooks/use-edit-property'

import {
	EditPropertyData,
	EditPropertyDTO
} from '../../_validations/edit-property-form-schema'
import { LocationPicker } from '../location-picker'

interface PropertyWithMedia extends Property {
	images: Media[]
}

interface EditPropertyFormProps {
	property: PropertyWithMedia
}

export const EditPropertyForm = ({ property }: EditPropertyFormProps) => {
	const { data: session } = useSession()

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		setValue,
		watch,
		formState: { errors }
	} = useForm<EditPropertyData>({
		resolver: zodResolver(EditPropertyDTO),
		defaultValues: {
			title: property.title,
			area: 'm² ' + property.area.toString(),
			bathroomCount: property.bathroomCount,
			bedroomCount: property.bedroomCount,
			buildingArea: 'm² ' + property.buildingArea.toString(),
			city: property.city,
			description: property.description,
			latitude: property.latitude,
			longitude: property.longitude,
			locationValue: property.locationValue,
			neighborhood: property.neighborhood,
			state: property.state,
			price:
				'R$ ' +
				new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
					property.price / 100
				),
			media: null,
			visibility: property.visibility
		}
	})

	const { edit: editProperty, isLoading } = useEditProperty()

	const onSubmit = async (data: EditPropertyData) => {
		await editProperty({
			data,
			userId: session?.user.id as string,
			propertyId: property.id
		})
		reset()
	}

	const watchMedia = watch('media')

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-6">
				<Controller
					control={control}
					name="visibility"
					render={({ field }) => {
						return (
							<FormGroup className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
								<div className="flex flex-col gap-0.5">
									<FormLabel>Visibilidade da Propriedade</FormLabel>
									<p className="text-sm text-muted-foreground">
										Marque esta opção para tornar a propriedade visível para os
										usuários.
									</p>
								</div>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									aria-readonly
								/>
							</FormGroup>
						)
					}}
				></Controller>

				<Controller
					control={control}
					name="locationValue"
					render={({ field }) => {
						return (
							<div>
								<FormLabel>Tipo</FormLabel>
								<RadioGroup
									className="flex max-w-md flex-wrap gap-8 pt-2"
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
					<FormLabel>Localização no mapa</FormLabel>

					<LocationPicker
						onLocationSelect={(lat, lng) => {
							setValue('latitude', lat)
							setValue('longitude', lng)
						}}
						initialLocation={{
							lat: property.latitude,
							lng: property.longitude
						}}
					/>
					{errors.latitude && errors.longitude && (
						<span className="text-red-500">{errors.latitude.message}</span>
					)}
				</FormGroup>

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
					<FormLabel htmlFor="neighborhood">Bairro</FormLabel>
					<FormInput
						className="mt-1"
						id="neighborhood"
						type="text"
						placeholder="Bairro..."
						{...register('neighborhood')}
					/>
					{errors.neighborhood && (
						<span className="text-red-500">{errors.neighborhood.message}</span>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="state">Estado</FormLabel>
					<FormInput
						className="mt-1"
						id="state"
						type="text"
						placeholder="SP"
						maxLength={2}
						{...register('state', {
							setValueAs: (value: string) => value.toUpperCase(),
							pattern: /^[A-Z]*$/
						})}
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
					<FormLabel htmlFor="buildingArea">Area Construida</FormLabel>
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

				<Controller
					control={control}
					name="media"
					render={() => (
						<Dropzone
							onDrop={(acceptedFiles) => {
								setValue('media', acceptedFiles as unknown as FileList, {
									shouldValidate: true
								})
							}}
						>
							{({ getRootProps, getInputProps, isDragActive }) => (
								<div className="flex flex-col gap-1">
									<FormLabel>Imagens</FormLabel>
									<div
										className="mt-2 cursor-pointer rounded-lg border border-dashed  p-4"
										{...getRootProps()}
									>
										<input {...getInputProps()} />
										<div className="flex flex-col items-center justify-center gap-4">
											<FileUp className="h-5 w-5" />
											{isDragActive ? (
												<p>Arraste os arquivos aqui...</p>
											) : (
												<p>
													Arraste e solte os arquivos aqui, ou clique para
													selecionar os arquivos
												</p>
											)}
											{errors.media && (
												<span className="text-red-500">
													{errors.media.message}
												</span>
											)}
										</div>
									</div>

									<div className="mt-2 grid grid-cols-3 gap-4">
										{Array.from(watchMedia || []).map((file, index) => (
											<picture key={index}>
												<img
													src={URL.createObjectURL(file)}
													alt={`Imagem ${index + 1}`}
													className="h-24 w-full rounded-md object-cover"
												/>
											</picture>
										))}

										{!watchMedia &&
											property.images.map((image, index) => (
												<picture key={index}>
													<img
														src={image.url || ''}
														alt={`Image ${index}`}
														className="h-24 w-full rounded-md object-cover"
													/>
												</picture>
											))}
									</div>
								</div>
							)}
						</Dropzone>
					)}
				/>
			</div>
			<FormGroup className="mt-6">
				<FormButton type="submit" className="w-full">
					{isLoading ? 'Editando...' : 'Editar'}
				</FormButton>
			</FormGroup>
		</Form>
	)
}
