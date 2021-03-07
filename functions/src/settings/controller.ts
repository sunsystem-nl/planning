import {Request, Response} from 'express';
import * as admin from 'firebase-admin';

export const create = async (req: Request, res: Response) => {
	try {
		const {year} = req.body;

		if (!year || year === '') {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld.'});
		}

		const docID = `${year}`;

		const yearDoc = {
			id: year,
			year: year
		};

		await admin.firestore().collection('/years').doc(docID).create(yearDoc);

		return res.status(200).send({
			message: 'Jaar succesvol toegevoegd.',
			year: year
		});
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const all = async (req: Request, res: Response) => {
	try {
		const listYearsRef = await admin.firestore().collection('/years');
		const snapshot = await listYearsRef.get();

		// @ts-ignore
		let years = [];

		if (snapshot.empty) {
			return res.status(400).send({message: 'Geen vakanties gevonden'});
		}

		snapshot.forEach(doc => {
			years.push(doc.data());
		});

		// @ts-ignore
		return res.status(200).send({years});
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const remove = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;

		const yearsRef = await admin.firestore().collection('/years').doc(id).get();
		const year = await yearsRef.data();

		await admin.firestore().collection('/years').doc(id).delete();

		return res.status(200).send({
			message: 'Jaar successvol verwijderd.',
			year: year
		});
	} catch (err) {
		return handleErrors(res, err);
	}
};

// handle errors when something goes wrong
const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({message: `${err.code} - ${err.message}`});
};