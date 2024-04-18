import { createClient } from '@supabase/supabase-js'

import { env } from '@/environment/env'

import { ensureCorrectImageSize } from './utils'

export const supabase = createClient(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const uploadToStorage = async ({
	file,
	folder,
	userId
}: {
	file: File
	folder: string
	userId: string
}) => {
	const formData = new FormData()
	formData.append('file', file)

	const { data } = await supabase.storage
		.from('real-estate')
		.upload(`${folder}/${userId}/${Date.now()}-${file.name}`, formData)

	return { data }
}

export const deleteFromStorage = async ({ path }: { path: string }) => {
	await supabase.storage.from('real-estate').remove([path])
}

const getPublicUrl = async ({ path }: { path: string }) => {
	const { data } = await supabase.storage.from('real-estate').getPublicUrl(path)
	return data
}

export const uploadImage = async ({
	file,
	folder,
	userId,
	currentPathOnStorage
}: {
	file: File
	folder: string
	userId: string
	currentPathOnStorage?: string
}) => {
	const isCorrectSize = ensureCorrectImageSize(file)

	if (!isCorrectSize) {
		return { error: 'Image size must be less than 10MB' }
	}

	if (currentPathOnStorage) {
		await deleteFromStorage({ path: currentPathOnStorage })
	}

	const { data } = await uploadToStorage({ file, folder, userId })

	const publicUrl = await getPublicUrl({ path: data?.path ?? '' })

	return { publicUrl, path: data?.path }
}
