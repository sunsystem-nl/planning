import React      from 'react'
import { Button } from 'react-bootstrap'

export const deleteColumn = ( rowData, { handleDeleteYear } ) => {
	return <Button
		className={ 'btn btn-danger' }
		onClick={ handleDeleteYear }
		value={ rowData.id }
	>
		Delete</Button>
}