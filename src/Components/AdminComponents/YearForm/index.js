import React from 'react'

export const AddYearForm = ( { submitForm, handleChangeYear } ) => {
	return (
		<form onSubmit={ submitForm } className={ 'mt-4' }>

			<div className='form-row'>
				<div className='form-group col-md-4'>
					<label
						htmlFor='year'
					>Jaar</label>
					<input
						type='number'
						id={ 'year' }
						placeholder={ 'Jaar' }
						className={ 'form-control' }
						style={ { height: 'calc(1.5em + .75rem + 6px)' } }
						name={ 'year' }
						onChange={ handleChangeYear }
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