import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

const moment = require('moment')

export const create = async (req: Request, res: Response) => {
	try {
		const { date, title } = req.body

		if (!date || date === '' || !title || title === '') {
			return res.status(400).send({ message: 'Niet alle velden zijn ingevuld.' })
		}

		const parsedDate = moment(date, 'YYYY/MM/DD')
		const day = parsedDate.format('DD')
		const week = parsedDate.format('WW')
		const month = parsedDate.format('MM')
		const year = parsedDate.format('YYYY')

		const docID = `${year}-${month}-${week}-${day}`

		const vacation = {
			id: docID,
			date: parsedDate,
			day: parseInt(day),
			week: parseInt(week),
			month: parseInt(month),
			year: parseInt(year),
			title,
		}

		await admin.firestore().collection('/vacations').doc(docID).create(vacation)

		return res.status(200).send({
			message: 'Vakantie dag succesvol toegevoegd.',
			vacation: vacation,
		})
	} catch (err) {
		return handleErrors(res, err)
	}
}

export const all = async (req: Request, res: Response) => {
	try {
		const listVacationsRef = await admin.firestore().collection('/vacations')
		const snapshot = await listVacationsRef.get()

		// @ts-ignore
		let vacations = []

		if (snapshot.empty) {
			return res.status(400).send({ message: 'Geen vakanties gevonden' })
		}

		snapshot.forEach((doc) => {
			const vacation = {
				day: doc.data().day,
				week: doc.data().week,
				month: doc.data().month,
				year: doc.data().year,
				title: doc.data().title,
				date: doc.data().date,
				uid: doc.id,
			}
			vacations.push(vacation)
		})

		// @ts-ignore
		return res.status(200).send({ vacations })
	} catch (err) {
		return handleErrors(res, err)
	}
}

export const getByYear = (req: Request, res: Response) => {
	try {
		const { year } = req.params

		const vacationRef = admin.firestore().collection('/vacations')
		return vacationRef
			.where('year', '==', parseInt(year))
			.get()
			.then((querySnapshot) => {
				let vacations: FirebaseFirestore.DocumentData[] = []

				querySnapshot.forEach((doc) => {
					vacations.push(doc.data())
				})

				res.status(200).send(vacations)
			})
			.catch((err) => {
				res.status(400).send({ message: 'Nothing found' })
			})
	} catch (err) {
		return handleErrors(res, err)
	}
}

export const get = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const vacationRef = await admin.firestore().collection('/vacations').doc(id).get()
		const doc = vacationRef.data()

		return res.status(200).send(doc)
	} catch (err) {
		return handleErrors(res, err)
	}
}

export const remove = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const vacationRef = await admin.firestore().collection('/vacations').doc(id).get()
		const vacation = await vacationRef.data()

		await admin.firestore().collection('/vacations').doc(id).delete()

		return res.status(200).send({
			message: 'Vakantie dag successvol verwijderd.',
			vacation: vacation,
		})
	} catch (err) {
		return handleErrors(res, err)
	}
}

// handle errors when something goes wrong
const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({ message: `${err.code} - ${err.message}` })
}
