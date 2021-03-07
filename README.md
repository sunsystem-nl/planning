![GitHub](https://img.shields.io/github/license/sunsystem-nl/planning?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/sunsystem-nl/planning?style=for-the-badge) 

# sunsystem planning

## setup


first clone the project
```js
git clone https://github.com/sunsystem-nl/planning.git projectname
cd projectname
```

next install the dependencies for the cliet
```
npm i
```

meanwhile create a `.env.local` file with the following `env` variables.

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_API_URL=http://localhost:5001/<YOUR_PROJECT_NAME>/us-central1/api
```

get the values from firebase settings, for `REACT_APP_API_URL` replace `<YOUR_PROJECT_NAME>` to the name of your project.

when client installation is done
```
cd functions

npm i
```

## Run the api emulator

```
cd functions

npm run serve
```
this will serve the api from your local machine and is needed to log a user in.

## Run the client

open a new terminal tab and run the following
```
npm run start
```

this will launch a development server for testing the application

## Build production version

from the root level of the project run.
```
npm run build
```

## Deploy functions to firebase cloud

```
firebase deploy --only functions
```