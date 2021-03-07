import {Application} from 'express';
import {create, all, get, update, remove} from './controller';

import {isAuthenticated} from '../auth/authenticated';
import {isAuthorized} from '../auth/authorized';

export function productRoutesConfig(app: Application) {
	// create a new product
	app.post('/products', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		create
	]);

	// list all products
	app.get('/products', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		all
	]);

	// list a product by id
	app.get('/products/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		get
	]);

	// update a product
	app.patch('/products/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		update
	]);

	// delete a product
	app.delete('/products/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		remove
	]);
}