import { Application } from 'express';
import { create, all, getByYear, get, remove } from './controller';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function vacationRoutesConfig(app: Application) {
	// create vacation day
	app.post('/vacation', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		create
	]);

	// list all vacation days
	app.get('/vacation', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		all
	]);

	// list a vacation day by id
	app.get('/vacation/year/:year', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		getByYear
	]);

	// list a vacation day by id
	app.get('/vacation/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		get
	]);

	// delete a vacation day
	app.delete('/vacation/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		remove
	]);
}