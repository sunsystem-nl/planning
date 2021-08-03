import React from 'react'

export const PageTitle = ({ title }) => {
	return <h2
		className={'h3 text-warning'}
		style={{ maxWidth: '750px', width: '100%', margin: '0', padding: '0' }}
	>{title}</h2>
}