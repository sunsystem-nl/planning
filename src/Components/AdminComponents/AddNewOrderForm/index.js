import React from 'react'
import { useForm } from 'react-hook-form'

import { klantSelectField } from './klantSelectField'
import { dateSelectField } from './dateSelectField'
import { orderNummer } from './orderNummer'
import { referentie } from './referentieField'
import { productAantal } from './productAantal'
import { productSelectField } from './productSelectField'
import { opmerkingField } from './opmerkingField'
import { urgentField } from './urgentField'

export const AddNewOrderForm = ({
	isUpdate,
	handleSubmitForm,
	data,
	users,
	products,
	setSelectedUser,
	selectedUser,
	setSelectedProduct,
	selectedProduct,
	setDate,
	currentDate,
	invalidDates,
	setAantal,
	aantal,
	opmerking,
	setOpmerking,
	urgent,
	setUrgent
}) => {
	const { register, handleSubmit } = useForm({
		defaultValues: data === 'undefined' ? '' : data,
	})

	return (
		<form
			onSubmit={handleSubmit(handleSubmitForm)}
			className={'mx-auto w-100'}
		>
			{klantSelectField(selectedUser, setSelectedUser, register, users)}

			{dateSelectField(isUpdate, setDate, register, currentDate, invalidDates)}

			{orderNummer(register)}

			{referentie(register)}

			{productAantal(register, setAantal)}

			{productSelectField(selectedProduct, register, setSelectedProduct, products, aantal)}

			{opmerkingField(register, opmerking, setOpmerking)}

			{urgentField(register, urgent, setUrgent)}

			<div className='form-row mt-3'>
				<div className='col-12'>
					<button type='submit' className='btn btn-warning'>
						{data ? 'Update Opdracht' : 'Maak Nieuwe Opdracht'}
					</button>
				</div>
			</div>
		</form>
	)
}