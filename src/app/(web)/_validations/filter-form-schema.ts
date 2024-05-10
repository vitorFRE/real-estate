import { z } from 'zod'

import { removeNonNumericChars } from '@/lib/utils'

export const FilterFormDTO = z
	.object({
		type: z.string().optional(),
		areaMin: z.string().optional(),
		areaMax: z.string().optional(),
		moneyMin: z.string().optional(),
		moneyMax: z.string().optional()
	})
	.superRefine((data, ctx) => {
		const moneyMin = data.moneyMin
			? removeNonNumericChars(data.moneyMin)
			: undefined
		const moneyMax = data.moneyMax
			? removeNonNumericChars(data.moneyMax)
			: undefined
		const areaMin = data.areaMin
			? removeNonNumericChars(data.areaMin)
			: undefined
		const areaMax = data.areaMax
			? removeNonNumericChars(data.areaMax)
			: undefined

		if (moneyMin !== undefined && moneyMax !== undefined) {
			if (parseFloat(moneyMin) >= parseFloat(moneyMax)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['moneyMax'],
					message:
						'O valor mínimo de dinheiro não pode ser maior que o valor máximo.'
				})
			}
		}

		if (areaMin !== undefined && areaMax !== undefined) {
			if (parseFloat(areaMin) >= parseFloat(areaMax)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['areaMax'],
					message: 'A área mínima não pode ser maior ou igual à área máxima.'
				})
			}
		}

		if (
			(areaMin !== undefined && areaMax === undefined) ||
			(areaMin === undefined && areaMax !== undefined)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['areaMax'],
				message: 'Ambos os campos de área devem ser preenchidos.'
			})
		}

		if (
			(moneyMin !== undefined && moneyMax === undefined) ||
			(moneyMin === undefined && moneyMax !== undefined)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['moneyMax'],
				message: 'Ambos os campos de dinheiro devem ser preenchidos.'
			})
		}

		if (moneyMin !== undefined && parseFloat(moneyMin) < 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['moneyMin'],
				message: 'O valor mínimo de dinheiro não pode ser negativo.'
			})
		}

		if (areaMin !== undefined && parseFloat(areaMin) < 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['areaMin'],
				message: 'A área mínima não pode ser negativa.'
			})
		}

		// Adicione outras validações conforme necessário
	})
export type FilterFormData = z.infer<typeof FilterFormDTO>
