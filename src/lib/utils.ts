import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// unique image validate
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

// multiples image validate
export const validateMediaFiles = (mediaFiles: FileList | null): boolean => {
	if (!mediaFiles) {
		return false
	}

	let totalSize = 0

	for (let i = 0; i < mediaFiles.length; i++) {
		const file = mediaFiles[i]
		const allowedTypes = ['image/jpeg', 'image/png']
		if (!allowedTypes.includes(file.type)) {
			return false
		}

		totalSize += file.size
	}

	const maxSize = 10 * 1024 * 1024 // 10MB em bytes
	if (totalSize > maxSize) {
		return false // Se o tamanho total for maior que 10MB, a validação falha
	}

	return true
}
