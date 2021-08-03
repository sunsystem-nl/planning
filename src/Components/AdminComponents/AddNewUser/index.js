import axios from 'axios'
import { Messages } from 'primereact/messages'
import React, { useContext, useRef } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { PageTitle } from '../PageTitle'
import { AddNewUserForm } from '../UserForm'
import { validator } from '../UserForm/validator'

/**
 * @description component to create a new user
 * @returns {JSX.Element}
 * @constructor
 */
export const AddNewUser = () => {
	/**
	 * @description get the bearer token
	 */
	const { token } = useContext(AuthContext)

	/**
	 * @description The message that is displayed in case of an error or
	 *     successful operation
	 * @type {React.MutableRefObject<null>}
	 */
	const message = useRef(null)

	/**
	 * @description add a new user to the database
	 * @param evt
	 * @returns {Promise<*>}
	 */
	const handleNewUserSubmit = async (evt) => {

		/**
		 * @description destructure the event
		 */
		const { contactpersoon, email, wachtwoord, huisnummer, klantnummer, land, leverdag, naamKort, naamLang, plaats, postcode, role, straatnaam, telefoonMobiel, telefoonVast, wilemail } = evt

		const isupdate = false

		/**
		 * @description validate if fields have the correct values
		 * @file ../UserForm/validator.js
		 */
		// eslint-disable-next-line
		const errors = validator(email, wachtwoord, isupdate, klantnummer, contactpersoon, naamKort, naamLang)

		/**
		 * @description if the errors array is not empty show the user the
		 *     error messages
		 * @TODO: fix errors
		 */
		// if (errors) return message.current.show(errors)

		/**
		 * @description create the post body
		 * @type {string}
		 * @TODO: update the api to check only for required fields
		 */
		const body = JSON.stringify({
			'contactpersoon': contactpersoon,
			'email': email,
			'huisnummer': huisnummer || '',
			'klantnummer': klantnummer || '',
			'land': land || '',
			'leverdag': leverdag || '',
			'naamKort': naamKort,
			'naamLang': naamLang,
			'plaats': plaats || '',
			'postcode': postcode || '',
			'role': role || '',
			'straatnaam': straatnaam || '',
			'telefoonMobiel': telefoonMobiel || '',
			'telefoonVast': telefoonVast || '',
			'password': wachtwoord,
			'wilemail': false || wilemail
		})

		try {
			/**
			 * @description create a post request to the api and store new user
			 *     to the database
			 * @type {AxiosResponse<any>}
			 */
			const result = await axios.post(`${process.env.REACT_APP_API_URL}/users`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})

			/**
			 * @description if the response is OK show message to user
			 */
			if (result.status === 200) {
				message.current.show([
					{
						severity: 'success',
						detail: 'De gebruiker is succesvol toegevoegd aan de database.',
					},
				])
			}
		} catch (err) {
			/**
			 * @description if there is any error show user a message
			 */
			message.current.show([
				{
					severity: 'error',
					detail: 'Er is iets fout gegaan met een gebruiker toevoegen, probeer nogmaals.',
				},
			])
		}

	}

	return (
		<div
			className={'d-flex flex-column p-5'}
			style={{ minHeight: 'calc(100vh - 59px)', height: '100%' }}
		>
			<div
				style={{
					maxWidth: '900px',
					margin: '0',
					width: '100%',
				}}
			>
				<PageTitle title={'Voeg een nieuwe gebruiker toe.'} />
				<Messages ref={message} id={'message'} />
				<AddNewUserForm handleSubmitForm={handleNewUserSubmit} />
			</div>
		</div>
	)
}