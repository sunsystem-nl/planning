import React         from 'react'
import { PageTitle } from '../PageTitle'

export const AddNewOrder = () => {
	return (
		<div
			className={ 'd-flex flex-column p-5' }
			style={ { minHeight: 'calc(100vh - 59px)', height: '100%' } }
		>
			<div
				style={ {
					maxWidth: '900px',
					margin: '0',
					width: '100%',
				} }
			>
				<PageTitle title={ 'Voeg een nieuwe opdracht toe.' } />
			</div>
		</div>
	)
}