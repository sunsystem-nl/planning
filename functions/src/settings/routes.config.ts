import { Application } from 'express';
import { create, all, remove } from './controller';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function settingsRoutesConfig(app: Application) {
	// create new year
	app.post('/years', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		create
	]);

	// list all years
	app.get('/years', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer', 'klant'], allowSameUser: false }),
		all
	]);

	// Remove year
	app.delete('/years/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		remove
	]);
}