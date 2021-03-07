import {Request, Response} from 'express';
import * as admin from 'firebase-admin';

const mapProducts = (productsRef: admin.firestore.DocumentData | undefined) => {
	return {
		uid: productsRef?.uid,
		productNaamSingular: productsRef?.productNaamSingular,
		productNaamPlural: productsRef?.productNaamPlural
	};
};

// create new product
export const create = async (req: Request, res: Response) => {
	try {
		// destructure request body
		const {
			productNaamSingular,
			productNaamPlural,
		} = req.body;

		if (!productNaamSingular || !productNaamPlural || productNaamSingular === '' || productNaamPlural === '') {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld.'});
		}

		const product = {
			productNaamSingular,
			productNaamPlural
		};

		const docID = productNaamSingular;

		await admin.firestore().collection('/products').doc(docID).create(product);
		return res.status(200).send({
			message: 'Product succesvol toegevoegd.',
			product: product
		});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleErrors(res, err);
	}
};

// get all products
export const all = async (req: Request, res: Response) => {
	try {
		const listProductsRef = await admin.firestore().collection('/products');
		const snapshot = await listProductsRef.get();

		// @ts-ignore
		let products = [];

		if (snapshot.empty) {
			return res.status(400).send({message: 'Geen producten gevonden.'});
		}

		snapshot.forEach(doc => {
			const product = {
				productNaamSingular: doc.data().productNaamSingular,
				productNaamPlural: doc.data().productNaamPlural,
				uid: doc.id
			};
			products.push(product);
		});

		// @ts-ignore
		return res.status(200).send({products});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleErrors(res, err);
	}
};

// get specific product
export const get = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;

		const productRef = await admin.firestore().collection('/products').doc(id).get();
		const doc = productRef.data();

		return res.status(200).send(mapProducts(doc));
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleErrors(res, err);
	}
};

// update specific product
export const update = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;

		if (!id) {
			return res.status(400).send({message: 'Product niet gevonden.'});
		}

		const {productNaamSingular, productNaamPlural} = req.body;

		if (!productNaamSingular || !productNaamPlural || productNaamSingular === '' || productNaamPlural === '') {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld.'});
		}

		const product = {
			productNaamSingular,
			productNaamPlural
		};

		await admin.firestore().collection('/products').doc(id).update(product);


		return res.status(200).send({
			message: 'Product succesvol geupdate.',
			product: product
		});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleErrors(res, err);
	}
};

// delete a product
export const remove = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;

		const productRef = await admin.firestore().collection('/products').doc(id).get();
		const product = await productRef.data();

		await admin.firestore().collection('/products').doc(id).delete();

		return res.status(200).send({
			message: 'Product succesvol verwijderd',
			product: product
		});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleErrors(res, err);
	}
};

// handle errors when something goes wrong
const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({message: `${err.code} - ${err.message}`});
};