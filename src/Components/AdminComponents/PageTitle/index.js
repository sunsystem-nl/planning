import React from 'react'

export const PageTitle = ( { title } ) => {
	return <h2
		className={ 'h3 text-warning' }
		style={ { maxWidth: '750px', width: '100%' } }
	>{ title }</h2>
}