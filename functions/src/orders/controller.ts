import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const moment = require('moment');

export const create = async (req: Request, res: Response) => {
	const {
		klantID,
		klantLeverDag,
		klantEmail,
		productID,
		date,
		ordernummer,
		opmerking,
		productAantal,
		referentie,
		urgent
	} = req.body;

	const parsedDate = moment(date);

	const day = parsedDate.format('DD');
	const dayText = parsedDate.format('dddd');
	const week = parsedDate.format('WW');
	const month = parsedDate.format('MM');
	const year = parsedDate.format('YYYY');

	const docID = `${year}`;
	const collectionID = `${week}`;
	const orderID = `${year}-${week}-${month}-${day}-${ordernummer}`;

	try {
		const orderRef = await admin.firestore().collection('/orders').doc(docID)
		const orders = await orderRef.listCollections()

		if (orders.length > 1) {
			// @ts-ignore
			return orders.forEach(async (collection) => {
				const nestedOrderRef = await admin.firestore().collection('/orders').doc(docID).collection(collection.id)

				const snapshot = await nestedOrderRef.where('ordernummer', '==', ordernummer).get()

				if (!snapshot.empty) {
					return res.status(400).send({ message: `De opdracht met opdrachtnummer: ${ordernummer} staat al in de database voor ${docID}.` })
				}

				const klantRef = await admin.firestore().collection('/users').doc(klantID).get()
				const klantNaamKort = await klantRef.data()?.naamKort;
				const klantWilEmail = await klantRef.data()?.wilemail

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

				let dagText = ''

				if (dayText === 'Monday') {
					dagText = 'Maandag'
				}

				if (dayText === 'Tuesday') {
					dagText = 'Dinsdag'
				}

				if (dayText === 'Wednesday') {
					dagText = 'Woensdag'
				}

				if (dayText === 'Thursday') {
					dagText = 'Donderdag'
				}

				if (dayText === 'Friday') {
					dagText = 'Vrijdag'
				}

				if (dayText === 'Saturday') {
					dagText = 'Zaterdag'
				}

				if (dayText === 'Sunday') {
					dagText = 'Zondag'
				}

				const orderObject = {
					orderID,
					klantNaamKort,
					klantID,
					klantLeverDag,
					klantEmail,
					klantWilEmail,
					leverDatumDag: parseInt(day),
					leverDatumDagText: dagText,
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
			})

		} else {
			const klantRef = await admin.firestore().collection('/users').doc(klantID).get()
			const klantNaamKort = await klantRef.data()?.naamKort;
			const klantWilEmail = await klantRef.data()?.wilemail

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

			let dagText = ''

			if (dayText === 'Monday') {
				dagText = 'Maandag'
			}

			if (dayText === 'Tuesday') {
				dagText = 'Dinsdag'
			}

			if (dayText === 'Wednesday') {
				dagText = 'Woensdag'
			}

			if (dayText === 'Thursday') {
				dagText = 'Donderdag'
			}

			if (dayText === 'Friday') {
				dagText = 'Vrijdag'
			}

			if (dayText === 'Saturday') {
				dagText = 'Zaterdag'
			}

			if (dayText === 'Sunday') {
				dagText = 'Zondag'
			}

			const orderObject = {
				orderID,
				klantNaamKort,
				klantID,
				klantLeverDag,
				klantEmail,
				klantWilEmail,
				leverDatumDag: parseInt(day),
				leverDatumDagText: dagText,
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
		}
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const update = async (req: Request, res: Response) => {
	const { year, week, id } = req.params
		const {
			klantID,
			klantLeverDag,
			klantEmail,
			productID,
			date,
			ordernummer,
			opmerking,
			productAantal,
			referentie,
			urgent
		} = req.body;
		const old_ordersRef = await admin.firestore().collection('/orders').doc(year).collection(week).doc(id)

		const old_result = await old_ordersRef.get()
		const old_docID = await old_result.data()?.leverDatumJaar
		const old_collectionID = await old_result.data()?.leverDatumWeek
		const old_orderID = await `${old_result.data()?.leverDatumJaar}-${old_result.data()?.leverDatumWeek}-${old_result.data()?.leverDatumMaand}-${old_result.data()?.leverDatumDag}-${old_result.data()?.ordernummer}`

		const test = {
			old_docID,
			old_collectionID,
			old_orderID
		}

		const parsedDate = moment(date);

		const temp_day = parsedDate.format('DD');
		const temp_dayText = parsedDate.format('dddd');
		const temp_week = parsedDate.format('WW');
		const temp_month = parsedDate.format('MM');
		const temp_year = parsedDate.format('YYYY');
		const temp_orderID = `${temp_year}-${temp_week}-${temp_month}-${temp_day}-${ordernummer}`;
		const temp_klantID = klantID
		const temp_klantEmail = klantEmail
		const temp_klantLeverDag = klantLeverDag
		const temp_opmerking = opmerking
		const temp_referentie = referentie
		const temp_urgent = urgent
		const temp_pantser = await old_result.data()?.statusPantser
		const temp_kast = await old_result.data()?.statusKast
		const temp_kastGereed = await old_result.data()?.statusKastGereed
		const temp_ingetrokken = await old_result.data()?.statusIngetrokken
		const temp_geleiders = await old_result.data()?.statusGeleiders
		const temp_bediening = await old_result.data()?.statusBediening
		const temp_afgehaald = await old_result.data()?.statusAfgehaald
		const temp_gereed = await old_result.data()?.statusGereed

		const temp_docID = `${temp_year}`;
		const temp_collectionID = `${temp_week}`;
	try {
		const klantRef = await admin.firestore().collection('/users').doc(klantID).get()
		const temp_klantNaamKort = await klantRef.data()?.naamKort;
		const temp_klantWilEmail = await klantRef.data()?.wilemail

		const productRef = await admin.firestore().collection('/products').doc(productID).get();
		let temp_productNaam;

				if (parseInt(productAantal) === 1) {
					temp_productNaam = productRef.data()?.productNaamSingular;
				} else {
					temp_productNaam = productRef.data()?.productNaamPlural;
				}

		let dagText = ''

		if (temp_dayText === 'Monday') {
			dagText = 'Maandag'
		}

		if (temp_dayText === 'Tuesday') {
			dagText = 'Dinsdag'
		}

		if (temp_dayText === 'Wednesday') {
			dagText = 'Woensdag'
		}

		if (temp_dayText === 'Thursday') {
			dagText = 'Donderdag'
		}

		if (temp_dayText === 'Friday') {
			dagText = 'Vrijdag'
		}

		if (temp_dayText === 'Saturday') {
			dagText = 'Zaterdag'
		}

		if (temp_dayText === 'Sunday') {
			dagText = 'Zondag'
		}

		const temp_orderObject = {
			orderID: temp_orderID,
			klantNaamKort: temp_klantNaamKort,
			klantID: temp_klantID,
			klantLeverDag: temp_klantLeverDag,
			klantEmail: temp_klantEmail,
			klantWilEmail: temp_klantWilEmail,
			leverDatumDag: parseInt(temp_day),
			leverDatumDagText: dagText,
			leverDatumJaar: parseInt(temp_year),
			leverDatumMaand: parseInt(temp_month),
			leverDatumWeek: parseInt(temp_week),
			opmerking: temp_opmerking,
			ordernummer: parseInt(ordernummer),
			productAantal: parseInt(productAantal),
			productNaam: temp_productNaam,
			referentie: temp_referentie,
			urgent: temp_urgent,
			statusPantser: temp_pantser,
			statusKast: temp_kast,
			statusKastGereed: temp_kastGereed,
			statusIngetrokken: temp_ingetrokken,
			statusGeleiders: temp_geleiders,
			statusBediening: temp_bediening,
			statusAfgehaald: temp_afgehaald,
			statusGereed: temp_gereed
		};

		if(temp_orderID.toString() != id.toString()) {
			await admin.firestore().collection('/orders').doc(temp_docID).collection(temp_collectionID).doc(temp_orderID).create(temp_orderObject);

			await old_ordersRef.delete()

			return res.status(200).send({
				test,
				body: req.body,
				date: parsedDate,
				params: req.params
			})
		} else {
			// await admin.firestore().collection('/orders').doc(temp_docID).collection(temp_collectionID).doc(temp_orderID).update(temp_orderObject);
			await old_ordersRef.set(temp_orderObject)
		}

		return res.status(200).send({
			message: `Opdracht successvol geupdate!`
		})
	} catch (err) {
		return handleErrors(res, err)
	}
};

export const updateStatus = async (req: Request, res: Response) => {
	const {year, week, id} = req.params

	const orderRef = await admin.firestore().collection('/orders').doc(year).collection(week).doc(id)

	console.log('orderref', orderRef, 'body', req.body)
	try {

		const result = await orderRef.update(req.body)

		return res.status(200).send({result})

	} catch(err) {
		return handleErrors(res, err)
	}


}

export const getByYear = async (req: Request, res: Response) => {
	try {
		const { year } = req.params;

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

export const getAllDoneNotDelivered = async (req: Request, res: Response) => {
	try {
		const { year } = req.params

		const yearCollections = await admin.firestore().collection('/orders').doc(year).listCollections();
		const yearOrders: any[] = [];

		for (const collection of yearCollections) {
			const collectionRef = await admin.firestore().collection('/orders').doc(year).collection(collection.id);
			const snapshot = await collectionRef.where('statusGereed', '==', true).where('statusAfgehaald', '==', false).get();

			snapshot.forEach(doc => {
				return yearOrders.push(doc.data());
			});
		}

		return res.status(200).send(yearOrders);
	} catch (err) {
		return handleErrors(res, err);
	}
}

export const getAllDoneAndDelivered = async (req: Request, res: Response) => {
	try {
		const { year } = req.params

		const yearCollections = await admin.firestore().collection('/orders').doc(year).listCollections();
		const yearOrders: any[] = [];

		for (const collection of yearCollections) {
			const collectionRef = await admin.firestore().collection('/orders').doc(year).collection(collection.id);
			const snapshot = await collectionRef.where('statusGereed', '==', true).where('statusAfgehaald', '==', true).get();

			snapshot.forEach(doc => {
				return yearOrders.push(doc.data());
			});
		}

		return res.status(200).send(yearOrders);
	} catch (err) {
		return handleErrors(res, err);
	}
}

export const getByWeek = async (req: Request, res: Response) => {
	try {
		const { year, week } = req.params
		const ordersByWeek: any[] = [];

		const ordersByWeekRef = await admin.firestore().collection('/orders').doc(year).collection(week).where('statusGereed', '==', false).get()

			ordersByWeekRef.forEach(doc => {
				return ordersByWeek.push(doc.data());
			});

		return res.status(200).send(ordersByWeek);
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByWeekPantsers = async (req: Request, res: Response) => {
	try {
		const { year, week } = req.params
		const ordersByWeekPantsers: any[] = [];

		const ordersByWeekRef = await admin.firestore().collection('/orders').doc(year).collection(week).where('statusGereed', '==', false).where('statusPantser', '==', false).get()

			ordersByWeekRef.forEach(doc => {
				return ordersByWeekPantsers.push(doc.data());
			});

		return res.status(200).send(ordersByWeekPantsers);
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByWeekBediening = async (req: Request, res: Response) => {
	try {
		const { year, week } = req.params
		const ordersByWeekBediening: any[] = [];

		const ordersByWeekRef = await admin.firestore().collection('/orders').doc(year).collection(week).where('statusGereed', '==', false).where('statusBediening', '==', false).get()

			ordersByWeekRef.forEach(doc => {
				return ordersByWeekBediening.push(doc.data());
			});

		return res.status(200).send(ordersByWeekBediening);
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const getByYearByClient = async (req: Request, res: Response) => {
	try {
		return res.status(200).send({ message: 'success' });
	} catch (err) {
		return handleErrors(res, err);
	}
};

export const remove = async (req: Request, res: Response) => {

};

const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({ message: `${err.code} - ${err.message}` });
};