import { Application } from 'express';

import {
	getByWeek,
	create,
	remove,
	update,
	updateStatus,
	getByYear,
	getAllDoneNotDelivered,
	getAllDoneAndDelivered,
	getByYearByClient,
	getByWeekPantsers,
	getByWeekBediening
} from './controller';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function orderRoutesConfig(app: Application) {
	// create a new order
	app.post('/orders', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		create
	]);

	// list all orders for a certain year
	app.get('/orders/:year', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getByYear
	]);

	// list all orders for a certain year that are done
	app.get('/orders/:year/gereed-niet-afgehaald', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getAllDoneNotDelivered
	]);

	// list all orders for a certain year that are done
	app.get('/orders/:year/gereed-en-afgehaald', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getAllDoneAndDelivered
	]);

	// list all orders for a certain week
	app.get('/orders/:year/:week', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getByWeek
	]);

	// list all pantsers for a certain week
	app.get('/orders/:year/:week/pantsers', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getByWeekPantsers
	]);

	// list all bediening for a certain week
	app.get('/orders/:year/:week/bediening', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		getByWeekBediening
	]);

	// get all orders by customer
	app.get('/orders/:year/:clientID', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
		getByYearByClient
	]);

	// update an order
	app.patch('/orders/:year/:week/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: false }),
		update
	]);

	// update status of order
	app.patch('/orders/:year/:week/:id/status', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: false }),
		updateStatus
	])

	// delete an order
	app.delete('/orders/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		remove
	]);
}