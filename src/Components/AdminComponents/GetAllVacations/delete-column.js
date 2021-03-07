import React      from 'react'
import { Button } from 'react-bootstrap'

export const deleteColumn = ( rowData, { handleDeleteVacation } ) => {
	return <Button
		className={ 'btn btn-danger' }
		onClick={ handleDeleteVacation }
		value={ rowData.id }
	>
		Delete</Button>
}