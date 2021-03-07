import React      from 'react'
import { Button } from 'react-bootstrap'

export const deleteColumn = ( rowData, { handleDeleteProduct } ) => {
	return <Button
		className={ 'btn btn-danger' }
		onClick={ handleDeleteProduct }
		value={ rowData.uid }
	>
		Delete</Button>
}