import axios           from 'axios'
import { Column }      from 'primereact/column'
import { DataTable }   from 'primereact/datatable'
import { MultiSelect } from 'primereact/multiselect'
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
}                      from 'react'
import { Modal }       from './modal'
import { AuthContext } from '../../../Context/AuthContext'
import { PageTitle }   from '../PageTitle'

export const GetAllUsers = () => {
	const { token } = useContext( AuthContext )

	const columns = [
		{ field: 'email', header: 'Email' },
		{ field: 'naamKort', header: 'Bedrijfs Naam' },
		{ field: 'contactpersoon', header: 'Contact Persoon' },
		{ field: 'telefoonMobiel', header: 'Telefoon Mobiel' },
		{ field: 'telefoonVast', header: 'Telefoon Vast' },
	]

	const [ selectedColumns, setSelectedColumns ] = useState( columns )
	const [ users, setUsers ] = useState( [] )
	const [ selectedUser, setSelectedUser ] = useState( null )
	const [ openModal, setOpenModal ] = useState( false )
	const dt = useRef( null )

	const fetchResults = useCallback( async() => {
		const result = await axios.get( `${ process.env.REACT_APP_API_URL }/users`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${ token }`,
			},
		} )
		if( result ) {
			setUsers( result.data.user )
		}
	}, [ token ] )

	useEffect( () => {
		const unsubscribe = fetchResults()
		return unsubscribe
	}, [ fetchResults ] )

	const onColumnToggle = ( event ) => {
		let selectedColumns = event.value
		let orderedSelectedColumns = columns.filter( col => selectedColumns.some( sCol => sCol.field === col.field ) )
		setSelectedColumns( orderedSelectedColumns )
	}

	const header = (
		<div
			style={ { textAlign: 'left' } }
			className='table-header-container d-flex flex-row justify-content-between'
		>
			<MultiSelect
				value={ selectedColumns } options={ columns }
				optionLabel='header' onChange={ onColumnToggle }
				style={ { width: '20em' } }
			/>
		</div>
	)

	const columnComponents = selectedColumns.map( col => {
		return <Column
			key={ col.field }
			field={ col.field }
			header={ col.header }
			filter
			filterPlaceholder={ `Filter op ${ col.header }` }
			sortable
		/>
	} )

	const handleCloseModal = () => {
		setOpenModal( !openModal )
	}

	const onRowSelect = ( evt ) => {
		setSelectedUser( evt.data )

		setOpenModal( !openModal )
	}

	return (
		<div
			className={ 'd-flex flex-column p-5' }
			style={ { minHeight: 'calc(100vh - 59px)', height: '100%' } }
		>
			<PageTitle title={ 'Alle SunSystem gebruikers.' } />
			<DataTable
				value={ users }
				header={ header }
				ref={ dt }
				removableSort
				paginator
				rows={ 10 }
				emptyMessage='Geen gebruikers gevonden'
				selection={ selectedUser }
				onSelectionChange={ e => setSelectedUser( e.value ) }
				selectionMode='single'
				dataKey='uid'
				onRowSelect={ onRowSelect }
				className={ 'pt-4' }
			>
				{ columnComponents }
			</DataTable>
			{ selectedUser && ( <Modal
				selectedUser={ selectedUser } openModal={ openModal }
				handleCloseModal={ handleCloseModal }
			/> ) }
		</div>
	)
}