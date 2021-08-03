import { sendMail } from './controller';
import { Application } from 'express';

import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { Headers } from '../cors/headers';

export function emailRoutesConfig(app: Application) {
	app.post('/email', [
		Headers,
		isAuthenticated,
		isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
		sendMail
	])
}