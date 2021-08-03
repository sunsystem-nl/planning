import { Application } from 'express';
import { create, all, get, update, remove } from './controller';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function productRoutesConfig(app: Application) {
	// create a new product
	app.post('/products', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		create
	]);

	// list all products
	app.get('/products', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		all
	]);

	// list a product by id
	app.get('/products/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		get
	]);

	// update a product
	app.patch('/products/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		update
	]);

	// delete a product
	app.delete('/products/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		remove
	]);
}