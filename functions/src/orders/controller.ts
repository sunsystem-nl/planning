import {Request, Response} from 'express';
import * as admin from 'firebase-admin';

const moment = require('moment');

export const create = async (req: Request, res: Response) => {
	const {
		klantID,
		productID,
		date,
		ordernummer,
		opmerking,
		productAantal,
		referentie,
		urgent
	} = req.body;

	const parsedDate = moment(date, 'YYYY/MM/DD');
	const day = parsedDate.format('DD');
	const week = parsedDate.format('WW');
	const month = parsedDate.format('MM');
	const year = parsedDate.format('YYYY');

	const docID = `${year}`;
	const collectionID = `${week}`;
	const orderID = `${year}-${week}-${month}-${day}-${ordernummer}`;

	try {
		const klantRef = await admin.firestore().collection('/users').doc(klantID).get();
		const klantNaamKort = await klantRef.data()?.naamKort;

		const productRef = await admin.firestore().collection('/products').doc(productID).get();
		let productNaam;
		if (parseInt(productAantal) === 1) {
			productNaam = productRef.data()?.productNaamSingular;
		} else {
			productNaam = productRef.data()?.productNaamPlural;
		}

		let statusObject = {
			statusAfgehaald: false,
			statusBediening: false,
			statusGeleiders: false,
			statusGereed: false,
			statusIngetrokken: false,
			statusKast: false,
			statusKastGereed: false,
			statusPantser: false
		};

		if (productNaam === 'Pantser' || productNaam === 'Pantsers') {
			statusObject.statusBediening = true;
			statusObject.statusGeleiders = true;
			statusObject.statusKast = true;
			statusObject.statusKastGereed = true;
			statusObject.statusIngetrokken = true;
		}

		if (productNaam === 'Hor' || productNaam === 'Horren') {
			statusObject.statusBediening = true;
			statusObject.statusGeleiders = true;
			statusObject.statusKast = true;
			statusObject.statusKastGereed = true;
			statusObject.statusIngetrokken = true;
			statusObject.statusPantser = true;
		}

		if (productNaam === 'Onderdeel' || productNaam === 'Onderdelen') {
			statusObject.statusGeleiders = true;
			statusObject.statusKast = true;
			statusObject.statusKastGereed = true;
			statusObject.statusIngetrokken = true;
			statusObject.statusPantser = true;
		}

		const orderObject = {
			klantNaamKort,
			klantID,
			leverDatumDag: parseInt(day),
			leverDatumJaar: parseInt(year),
			leverDatumMaand: parseInt(month),
			leverDatumWeek: parseInt(week),
			opmerking,
			ordernummer: parseInt(ordernummer),
			productAantal: parseInt(productAantal),
			productNaam,
			referentie,
			urgent,
			...statusObject
		};

		await admin.firestore().collection('/orders').doc(docID).collection(collectionID).doc(orderID).create(orderObject);
		return res.status(200).send({
			message: `De opdacht is successvol toegevoegd aan de database.`,
			order: orderObject
		});

	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByYear = async (req: Request, res: Response) => {
	try {
		const {year} = req.params;

		const yearCollections = await admin.firestore().collection('/orders').doc(year).listCollections();
		const yearOrders: any[] = [];

		for (const collection of yearCollections) {
			const collectionRef = await admin.firestore().collection('/orders').doc(year).collection(collection.id);
			const snapshot = await collectionRef.get();

			snapshot.forEach(doc => {
				return yearOrders.push(doc.data());
			});
		}

		return res.status(200).send(yearOrders);

	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByWeek = async (req: Request, res: Response) => {
	try {
		const {year, week} = req.params;

		const orderRef = await admin.firestore().collection('/orders').doc(year).collection(week);
		const snapshot = await orderRef.get();

		const weekOrders: any[] = [];
		snapshot.forEach(doc => {
			weekOrders.push(doc.data());
		});

		return res.status(200).send(weekOrders);
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByYearByClient = async (req: Request, res: Response) => {
	try {
		return res.status(200).send({message: 'success'});
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const update = async (req: Request, res: Response) => {

};

export const remove = async (req: Request, res: Response) => {

};

const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({message: `${err.code} - ${err.message}`});
};