import {Application} from 'express';
import {create, all, remove} from './controller';

import {isAuthenticated} from '../auth/authenticated';
import {isAuthorized} from '../auth/authorized';

export function settingsRoutesConfig(app: Application) {
	// create new year
	app.post('/years', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		create
	]);

	// list all years
	app.get('/years', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		all
	]);

	// Remove year
	app.delete('/years/:id', [
		isAuthenticated,
		isAuthorized({hasRole: ['admin'], allowSameUser: false}),
		remove
	]);
}