'use server'

import { revalidatePath } from 'next/cache'

import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'

const s3Client = new S3Client({
	forcePathStyle: true,
	region: process.env.SUPABASE_S3_REGION!,
	endpoint: process.env.SUPABASE_S3_ENDPOINT!,
	credentials: {
		accessKeyId: process.env.SUPABASE_S3_ACESS_KEY_ID!,
		secretAccessKey: process.env.SUPABASE_S3_SECRET_ACESS_KEY!
	}
})

//Upload
async function uploadImageToSupabase(file: Buffer, path: string) {
	const fileBuffer = file

	const params = {
		Bucket: process.env.SUPABASE_S3_BUCKET_NAME!,
		Key: `${path}`,
		Body: fileBuffer,
		ContentType: 'image/jpg'
	}

	const command = new PutObjectCommand(params)

	try {
		await s3Client.send(command)
		return {}
	} catch (error) {
		console.log(error)
		throw new Error('falhou ao upar imagens')
	}
}

export const getPublicUrl = (path: string) => {
	const endpoint = process.env.SUPABASE_URL!
	const bucket = process.env.SUPABASE_S3_BUCKET_NAME!
	return `${endpoint}/storage/v1/object/public/${bucket}/${path}`
}

export const uploadFiles = async (
	formData: FormData,
	folder: string,
	id: string
) => {
	const files: File[] = Array.from(formData.getAll('file') ?? []) as File[]

	if (files.length === 0) {
		return { status: 'error', message: 'Selecione um arquivo' }
	}

	const uploadPromises = files.map(async (file) => {
		if (file.size === 0) {
			return { status: 'error', message: 'Arquivo vazio' }
		}

		const buffer = Buffer.from(await file.arrayBuffer())
		const fileName = `${Date.now()}${file.name}`
		const path = `${folder}/${id}/${fileName}`

		await uploadImageToSupabase(buffer, path)

		const publicUrl = getPublicUrl(path)

		return { path, publicUrl }
	})

	const results = await Promise.all(uploadPromises)

	revalidatePath('/')

	return { status: 'success', message: 'Imagens upadas', files: results }
}

export const deleteImageFromSupabase = async (path: string) => {
	const params = {
		Bucket: process.env.SUPABASE_S3_BUCKET_NAME!,
		Key: `${path}`
	}

	const command = new DeleteObjectCommand(params)

	try {
		await s3Client.send(command)
		return {}
	} catch (error) {
		console.log(error)
		throw new Error('Falhou ao deletar a imagem')
	}
}
