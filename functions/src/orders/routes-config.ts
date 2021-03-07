import {Application} from 'express';

import {
	getByWeek,
	create,
	remove,
	update,
	getByYear,
	getByYearByClient
} from './controller';

import {isAuthenticated} from '../auth/authenticated';
import {isAuthorized} from '../auth/authorized';

export function orderRoutesConfig(app: Application) {
	// create a new order
	app.post('/orders', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		create
	]);

	// list all orders for a certain year
	app.get('/orders/:year', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin', 'werknemer'], allowSameUser: true}),
		getByYear
	]);

	// list all orders for a certain week
	app.get('/orders/:year/:week', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin', 'werknemer'], allowSameUser: true}),
		getByWeek
	]);

	// get all orders by customer
	app.get('/orders/:year/:clientID', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: true}),
		getByYearByClient
	]);

	// update an order
	app.patch('/orders/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		update
	]);

	// delete an order
	app.delete('/orders/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		remove
	]);
}