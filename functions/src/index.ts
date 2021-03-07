import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import {userRoutesConfig} from './users/routes-config';
import {productRoutesConfig} from './products/routes-config';
import {vacationRoutesConfig} from './vacation/routes-config';
import {orderRoutesConfig} from './orders/routes-config';
import {settingsRoutesConfig} from './settings/routes.config';

const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true}));

userRoutesConfig(app);
productRoutesConfig(app);
vacationRoutesConfig(app);
orderRoutesConfig(app);
settingsRoutesConfig(app);

export const api = functions.https.onRequest(app);