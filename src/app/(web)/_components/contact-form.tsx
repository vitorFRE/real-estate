'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormLabel,
	FormTextarea
} from '@/components/form/form'

import {
	ContactFormData,
	ContactFormDTO
} from '../_validations/contact-form-schema'

export const ContactForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ContactFormData>({
		resolver: zodResolver(ContactFormDTO)
	})

	const onSubmit = async (data: ContactFormData) => {
		console.log(data)
		reset()
	}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 rounded border px-4 pb-6 pt-4 shadow"
		>
			<div>
				<h3 className="text-2xl font-semibold text-foreground">
					Tem alguma duvida ?
				</h3>
				<p className="text-muted-foreground">
					Mande nós uma mensagem que responderemos o mais rápido possível
				</p>
			</div>
			<FormGroup>
				<FormLabel htmlFor="name">Nome</FormLabel>
				<FormInput
					className="mt-2"
					type="text"
					id="name"
					placeholder="Nome"
					{...register('name')}
				/>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
			</FormGroup>
			<FormGroup>
				<FormLabel htmlFor="email">Email</FormLabel>
				<FormInput
					type="email"
					className="mt-2"
					id="email"
					placeholder="Email"
					{...register('email')}
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
			</FormGroup>
			<FormGroup>
				<FormLabel htmlFor="content">Mensagem</FormLabel>
				<FormTextarea
					className="mt-2"
					id="content"
					placeholder="Mensagem"
					{...register('content')}
				/>
				{errors.content && (
					<span className="text-red-500">{errors.content.message}</span>
				)}
			</FormGroup>
			<FormButton>Enviar</FormButton>
		</Form>
	)
}
