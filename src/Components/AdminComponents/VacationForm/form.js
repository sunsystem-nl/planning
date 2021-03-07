import { Calendar } from 'primereact/calendar'
import React        from 'react'

export const AddVacationForm = ( { submitForm, handleChangeTitle, handleChangeDate, date } ) => {
	return (
		<form onSubmit={ submitForm } className={ 'mt-4' }>

			<div className='form-row'>
				<div className='form-group col-md-4'>
					<label
						htmlFor='title'
					>Naam</label>
					<input
						type='text'
						id={ 'title' }
						placeholder={ 'Vakantie Naam' }
						className={ 'form-control' }
						style={ { height: 'calc(1.5em + .75rem + 6px)' } }
						name={ 'title' }
						onChange={ handleChangeTitle }
					/>
				</div>
				<div className='form-group col-md-4'>

					<label
						htmlFor='date'
					>Datum</label>
					<Calendar
						id='date' value={ date }
						showIcon
						placeholder={ 'Vakantie Datum' }
						style={ { width: '100%' } }
						name={ 'date' }
						showWeek
						onChange={ handleChangeDate }
					/>

				</div>
				<div className='form-group col-md-4 d-flex align-items-end'>
					<button
						className={ 'btn btn-warning' }
						style={ {
							height: 'calc(1.5em + .75rem + 6px)',
							width: '100%',
						} }
					>Voeg toe
					</button>
				</div>
			</div>

		</form>
	)
}