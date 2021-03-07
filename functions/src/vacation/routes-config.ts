import {Application} from 'express';
import {create, all, getByYear, get, remove} from './controller';

import {isAuthenticated} from '../auth/authenticated';
import {isAuthorized} from '../auth/authorized';

export function vacationRoutesConfig(app: Application) {
	// create vacation day
	app.post('/vacation', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		create
	]);

	// list all vacation days
	app.get('/vacation', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		all
	]);

	// list a vacation day by id
	app.get('/vacation/year/:year', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		getByYear
	]);

	// list a vacation day by id
	app.get('/vacation/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		get
	]);

	// delete a vacation day
	app.delete('/vacation/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		remove
	]);
}