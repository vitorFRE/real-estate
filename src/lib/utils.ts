import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const ensureCorrectImageSize = (file: File) => {
	if (file.size / 1024 / 1024 > 10) {
		return false
	}

	if (
		!file.type.includes('png') &&
		!file.type.includes('jpeg') &&
		!file.type.includes('jpg')
	) {
		return false
	}

	return true
}
