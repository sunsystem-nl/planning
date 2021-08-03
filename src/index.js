import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './Components/App/App'
import reportWebVitals from './reportWebVitals'

// STYLES IMPORT
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'quill/dist/quill.bubble.css'

import PrimeReact, { locale, addLocale } from 'primereact/api'

PrimeReact.ripple = true

addLocale('nl', {
	firstDayOfWeek: 1,
	dayNames: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
	dayNamesShort: ['Zon', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
	dayNamesMin: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
	monthNames: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
	monthNamesShort: ['Jan', 'Feb', 'Maart', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
	today: 'Vandaag',
})

locale('nl')

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
