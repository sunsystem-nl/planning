import React from 'react'

export const AddProductForm = ( { submitForm, handleChangePlural, handleChangeSingular } ) => {
	return (
		<form onSubmit={ submitForm } className={ 'mt-4' }>

			<div className='form-row'>
				<div className='form-group col-md-4'>
					<label
						htmlFor='productNaamSingular'
					>Product Singular</label>
					<input
						type='text'
						id={ 'productNaamSingular' }
						placeholder={ 'Product naam singular' }
						className={ 'form-control' }
						style={ { height: 'calc(1.5em + .75rem + 6px)' } }
						name={ 'productNaamSingular' }
						onChange={ handleChangeSingular }
					/>
				</div>
				<div className='form-group col-md-4'>
					<label
						htmlFor='productNaamSingular'
					>Product Plural</label>
					<input
						type='text'
						id={ 'productNaamPlural' }
						placeholder={ 'Product naam plural' }
						className={ 'form-control' }
						style={ { height: 'calc(1.5em + .75rem + 6px)' } }
						name={ 'productNaamPlural' }
						onChange={ handleChangePlural }
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