import React, { useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { PageTitle } from '../PageTitle'
import { AddNewOrderForm } from '../AddNewOrderForm'
import { useCallback } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react'
import { validator } from '../AddNewOrderForm/validator'
import { Messages } from 'primereact/messages'

export const AddNewOrder = () => {
	/**
	 * @description get the bearer token
	 */
	const { token } = useContext(AuthContext)

	const currentDate = new Date()

	const [users, setUsers] = useState(null)
	const [selectedUser, setSelectedUser] = useState()
	const [date, setDate] = useState(currentDate)
	const [invalidDates, setInvalidDates] = useState(null)
	const [aantal, setAantal] = useState(null)
	const [products, setProducts] = useState(null)
	// eslint-disable-next-line
	const [selectedProduct, setSelectedProduct] = useState()
	const [opmerking, setOpmerking] = useState(null)
	const [urgent, setUrgent] = useState(false)

	const message = useRef(null)

	const getAllUsers = useCallback(async () => {
		const allUsers = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})
		if (allUsers) {
			setUsers(allUsers.data.user)
			setSelectedUser(allUsers.data.user[0].uid)
		}
	}, [token])

	useEffect(() => {
		const unsubscribeUsers = getAllUsers()
		return unsubscribeUsers
		// eslint-disable-next-line
	}, [getAllUsers])

	const getAllVacations = useCallback(async () => {
		const allVacations = await axios.get(`${process.env.REACT_APP_API_URL}/vacation`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})
		let disabledDatesArray = []
		if (allVacations) {
			allVacations.data.vacations.forEach(vac => {
				const tempDate = moment(`${vac.year}-${vac.month}-${vac.day}`, "YYYY-MM-DD")
				disabledDatesArray.push(tempDate._d)
			}
			)
		}
		setInvalidDates(disabledDatesArray)
		// eslint-disable-next-line
	}, [token, setInvalidDates])

	useEffect(() => {
		const unsubscribeVacations = getAllVacations()
		return unsubscribeVacations
		// eslint-disable-next-line
	}, [getAllVacations])

	const getAllProducts = useCallback(async () => {
		const allProducts = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})

		const productArray = []
		if (allProducts) {
			allProducts.data.products.forEach(prod => {
				productArray.push(prod)
			})
			setSelectedProduct(allProducts.data.products[0].productNaamSingular)
			setProducts(productArray)
		}
		// eslint-disable-next-line
	}, [token, aantal])

	useEffect(() => {
		const unsubscribeProducts = getAllProducts()
		return unsubscribeProducts
		// eslint-disable-next-line
	}, [getAllProducts])

	// eslint-disable-next-line
	const getSelectedUserInfo = useCallback(async (klantID) => {
		const selectedUserInfo = await axios.get(`${process.env.REACT_APP_API_URL}/users/${klantID}`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})
		return selectedUserInfo.data.user
	})

	const handleSubmit = async (evt) => {
		let ordernummer = parseInt(evt.ordernummer)
		let productAantal = parseInt(evt.productAantal)
		let { klantID, productNaam, referentie } = evt

		const userInfo = await getSelectedUserInfo(klantID)

		const errors = validator(selectedUser, date, aantal, referentie, ordernummer, productNaam)
		/**
		 * @description if the errors array is not empty show the user the
		 *     error messages
		 */
		if (errors.length >= 1) return message.current.show(errors)

		const body = JSON.stringify({
			klantID,
			klantLeverDag: userInfo.leverdag,
			klantEmail: userInfo.email,
			productID: productNaam,
			date,
			ordernummer,
			opmerking,
			productAantal,
			referentie,
			urgent
		})

		try {
			/**
			 * @description create a post request to the api and store new user
			 *     to the database
			 * @type {AxiosResponse<any>}
			 */
			const result = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})

			if (result.status === 200) {
				message.current.show([
					{
						severity: 'success',
						detail: 'De opdracht is succesvol toegevoegd aan de database.',
					},
				])
			}
		} catch (err) {
			/**
			 * @description if there is any error show user a message
			 */
			if (err.message === 'Request failed with status code 400') {
				message.current.show([
					{
						severity: 'error',
						detail: 'Deze opdracht staat al in de database.',
					},
				])
			} else {
				message.current.show([
					{
						severity: 'error',
						detail: 'Er is iets fout gegaan met een opdracht toevoegen, probeer nogmaals.',
					},
				])
			}
		}
	}

	return (
		<div
			className={'d-flex flex-row p-5'}
			style={{ minHeight: 'calc(100vh - 59px)', height: '100%' }}
		>
			<div
				style={{
					maxWidth: '600px',
					margin: '0',
					width: '100%',
				}}
			>

				<PageTitle title={'Voeg een nieuwe opdracht toe.'} />
				<Messages ref={message} id={'message'} />
				<AddNewOrderForm
					isUpdate={false}
					handleSubmitForm={handleSubmit}
					users={users}
					products={products}
					setSelectedUser={setSelectedUser}
					setSelectedProduct={setSelectedProduct}
					setDate={setDate}
					currentDate={currentDate}
					invalidDates={invalidDates}
					setAantal={setAantal}
					aantal={aantal}
					opmerking={opmerking}
					setOpmerking={setOpmerking}
					urgent={urgent}
					setUrgent={setUrgent}
				/>
			</div>
		</div>
	)
}