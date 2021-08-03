import { Application } from 'express';
import { create, all, get, remove, update } from './controller';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function userRoutesConfig(app: Application) {
	//create a new user
	app.post('/users', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		create
	]);

	// list all users
	app.get('/users', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'werknemer'], allowSameUser: true }),
		all
	]);

	// get a user by id
	app.get('/users/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({
			hasRole: ['admin', 'werknemer'],
			allowSameUser: true
		}),
		get
	]);

	// update a specific user
	app.patch('/users/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		update
	]);

	// delete a specific user
	app.delete('/users/:id', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		remove
	]);
}