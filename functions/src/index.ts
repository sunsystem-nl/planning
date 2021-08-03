import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
// import * as bodyParser from 'body-parser';

import { userRoutesConfig } from './users/routes-config';
import { productRoutesConfig } from './products/routes-config';
import { vacationRoutesConfig } from './vacation/routes-config';
import { orderRoutesConfig } from './orders/routes-config';
import { settingsRoutesConfig } from './settings/routes.config';
import { emailRoutesConfig } from './email/routes-config';

const serviceAccount = require('../serviceAccount.json');

process.env.TZ = 'Europe/Amsterdam'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

admin.firestore().settings({ ignoreUndefinedProperties: true })

const app = express();
app.use(express.json());
const corsOptions = {
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200
}
app.use(cors(corsOptions));

userRoutesConfig(app);
productRoutesConfig(app);
vacationRoutesConfig(app);
orderRoutesConfig(app);
settingsRoutesConfig(app);
emailRoutesConfig(app)

export const api = functions.https.onRequest(app);