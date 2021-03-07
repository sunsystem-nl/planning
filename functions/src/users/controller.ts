import {Request, Response} from 'express';
import * as admin from 'firebase-admin';

// map users
function mapUser(user: admin.auth.UserRecord, userRef: admin.firestore.DocumentData | undefined) {
	// get the role of the user from the claims
	const customClaims = (user.customClaims || {role: ''}) as { role?: string };
	const role = customClaims.role ? customClaims.role : '';

	// return a user with all stored information
	return {
		uid: user.uid,
		email: user.email,
		role,
		klantnummer: userRef?.klantnummer,
		naamKort: userRef?.naamKort,
		naamLang: userRef?.naamLang,
		contactpersoon: userRef?.contactpersoon,
		straatnaam: userRef?.straatnaam,
		huisnummer: userRef?.huisnummer,
		postcode: userRef?.postcode,
		plaats: userRef?.plaats,
		land: userRef?.land,
		telefoonVast: userRef?.telefoonVast,
		telefoonMobiel: userRef?.telefoonMobiel,
		leverdag: userRef?.leverdag,
		lastSignInTime: user.metadata.lastSignInTime,
		creationTime: user.metadata.creationTime
	};
}

// create a new user
export async function create(req: Request, res: Response) {
	try {
		// destructure request body
		const {
			password, email, role, klantnummer, naamKort, naamLang, contactpersoon, straatnaam, huisnummer, postcode, plaats, land, telefoonVast, telefoonMobiel, leverdag,
		} = req.body;

		// check if password email and role are set
		if (!password || password === '' || !email || email === '' || !role || role === '') {
			return res.status(400).send({message: 'Gebruikers email of password is incorrect.'});
		}

		// create a user for the firestore collections never store the password in the database
		const userObject = {
			email,
			role,
			klantnummer,
			naamKort,
			naamLang,
			contactpersoon,
			straatnaam,
			huisnummer,
			postcode,
			plaats,
			land,
			telefoonVast,
			telefoonMobiel,
			leverdag,
		};

		// check if all fields have a value
		if (
			!email || email === '' || !role || role === '' || !klantnummer || klantnummer === ''
			|| !naamKort || naamKort === '' || !naamLang || naamLang === '' ||
			!contactpersoon || contactpersoon === '' || !straatnaam || straatnaam === ''
			|| !huisnummer || huisnummer === '' || !postcode || postcode === '' ||
			!plaats || plaats === '' || !land || land === '' || !telefoonMobiel || telefoonMobiel === ''
			|| !leverdag || leverdag === ''
		) {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld.'});
		}

		// all checks done now it's time to add the user to authentication and firestore

		// create the new user
		const {uid} = await admin.auth().createUser({
			password, email
		});

		// set a custom claim for the new user by default this will be the role klant
		if (role === 'admin') {
			await admin.auth().setCustomUserClaims(uid, {admin: true});
		} else if (role === 'werknemer') {
			await admin.auth().setCustomUserClaims(uid, {werknemer: true});
		} else {
			await admin.auth().setCustomUserClaims(uid, {klant: true});
		}

		// add the new user to the database
		await admin.firestore().collection('/users').doc(uid).create(userObject);

		// all went well send the client a success message
		return res.status(200).send({message: 'De nieuwe gebruiker is succesvol toegevoegd aan de database.'});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleError(res, err);
	}
}

// get all users
// TODO: Change to getting users from the database.
export async function all(req: Request, res: Response) {
	try {
		// get all users from the database
		const listUsers = await admin.auth().listUsers();
		const listUsersRef = await admin.firestore().collection('/users');
		const snapshot = await listUsersRef.get();


		// @ts-ignore
		let user = [];
		// create the user object with authentication and firestore data combined
		listUsers.users.map(res => {
			snapshot.forEach(doc => {
				if (res.uid === doc.id) {
					const userData = {
						uid: res.uid,
						email: res.email,
						role: res.customClaims,
						lastSignInTime: res.metadata.lastSignInTime,
						creationTime: res.metadata.creationTime,
						...doc.data()
					};
					user.push(userData);
				}
			});
		});


		// return a list of all users
		// @ts-ignore
		return res.status(200).send({user});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleError(res, err);
	}
}

// get one user with a specific id
export async function get(req: Request, res: Response) {
	try {
		// get the id from the request params
		const {id} = req.params;

		// find the specific user in authentication
		const user = await admin.auth().getUser(id);

		// find the specific user in firestore
		const userRef = await admin.firestore().collection('/users').doc(id).get();
		const doc = await userRef.data();

		// user is found send the data
		return res.status(200).send({user: mapUser(user, doc)});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleError(res, err);
	}
}

// update a specific user
export async function update(req: Request, res: Response) {
	try {
		// get the users id from the request params
		const {id} = req.params;

		// destructure the request body
		const {
			password, email, role, klantnummer, naamKort, naamLang, contactpersoon, straatnaam, huisnummer, postcode, plaats, land, telefoonVast, telefoonMobiel, leverdag,
		} = req.body;

		// check if all fields have a value for authentication
		if (!id || id === '' || !password || password === '' || !email || email === '' || !role || role === '') {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld.'});
		}

		// create a user for the firestore collections
		const userObject = {
			email,
			role,
			klantnummer,
			naamKort,
			naamLang,
			contactpersoon,
			straatnaam,
			huisnummer,
			postcode,
			plaats,
			land,
			telefoonVast,
			telefoonMobiel,
			leverdag,
		};

		// check if all fields have a value
		if (
			!email || email === '' || !role || role === '' || !klantnummer || klantnummer === ''
			|| !naamKort || naamKort === '' || !naamLang || naamLang === '' ||
			!contactpersoon || contactpersoon === '' || !straatnaam || straatnaam === ''
			|| !huisnummer || huisnummer === '' || !postcode || postcode === '' ||
			!plaats || plaats === '' || !land || land === '' || !telefoonMobiel || telefoonMobiel === ''
			|| !leverdag || leverdag === ''
		) {
			return res.status(400).send({message: 'Niet alle velden zijn ingevuld om te updaten.'});
		}

		// all checks done now it's time to add the user to authentication and firestore

		// update the users password and email
		await admin.auth().updateUser(id, {password, email});

		// update the users custom claims
		await admin.auth().setCustomUserClaims(id, {role});

		// update the users fields in firestore
		await admin.firestore().collection('/users').doc(id).update(userObject);

		// get users information from authentication and firestore
		const user = await admin.auth().getUser(id);
		const userRef = await admin.firestore().collection('/users').doc(id).get();
		const doc = await userRef.data();

		// send new user information in response
		return res.status(200).send({user: mapUser(user, doc)});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleError(res, err);
	}
}

// delete a user
export async function remove(req: Request, res: Response) {
	try {
		// get the users id from the request params
		const {id} = req.params;

		// delete the user from authentication
		await admin.auth().deleteUser(id);

		// delete the user from firestore
		await admin.firestore().collection('/users').doc(id).delete();

		// user is successful deleted send the message
		return res.status(200).send({message: 'Gebruiker is succesvol verwijderd.'});
	} catch (err) {
		// something went wrong check the firebase-debug.log
		return handleError(res, err);
	}
}

// handle errors when something goes wrong
function handleError(res: Response, err: any) {
	return res.status(500).send({message: `${err.code} - ${err.message}`});
}