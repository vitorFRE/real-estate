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
				inputValue = inputValue.replace(/\D/g, '')
				inputValue = inputValue.replace(/(\d{2})$/, ',$1')
				inputValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
				inputValue = 'R$ ' + inputValue

				if (inputValue.length > 16) {
					inputValue = prevValue
				}
			}

			event.target.value = inputValue
			setPrevValue(inputValue)
		}

		return (
			<Input
				{...rest}
				ref={ref}
				className={cn(className)}
				onChange={handleChange}
			/>
		)
	}
)
FormInputMask.displayName = 'FormInputMask'

export { FormInputMask }
