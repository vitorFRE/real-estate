'use client'

import React from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputMaskProps extends InputProps {
	mask?: 'phoneNumber' | 'meters' | 'money'
}

const FormInputMask = React.forwardRef<HTMLInputElement, FormInputMaskProps>(
	({ className, mask, ...rest }, ref) => {
		const [prevValue, setPrevValue] = React.useState('')

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			let inputValue = event.target.value

			if (inputValue.length < prevValue.length) {
				setPrevValue(inputValue)
				return
			}

			if (mask === 'phoneNumber') {
				inputValue = inputValue.replace(/\D/g, '')

				inputValue = inputValue.slice(0, 11)
				inputValue = inputValue.replace(
					/(\d{2})(\d{0,5})(\d{0,4})/,
					'($1) $2-$3'
				)
			} else if (mask === 'meters') {
				inputValue = inputValue.replace(/\D/g, '')
				inputValue = inputValue.replace(/^0+/, '')
				inputValue = 'm² ' + inputValue.slice(0, 6)
			} else if (mask === 'money') {
				inputValue = inputValue
					.replace('.', '')
					.replace(',', '')
					.replace(/\D/g, '')

				const options = { minimumFractionDigits: 2 }
				const result = new Intl.NumberFormat('pt-BR', options).format(
					parseFloat(inputValue) / 100
				)

				inputValue = 'R$ ' + result

				if (inputValue.length > 16) {
					inputValue = prevValue
				}
			}

			event.target.value = inputValue
			setPrevValue(inputValue)
		}

		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key !== 'Backspace' && event.key !== 'Delete') {
				handleChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
			}
		}

		return (
			<Input
				{...rest}
				ref={ref}
				className={cn(className)}
				onKeyUp={handleKeyDown}
			/>
		)
	}
)
FormInputMask.displayName = 'FormInputMask'

export { FormInputMask }
