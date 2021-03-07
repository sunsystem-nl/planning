import axios            from 'axios'
import { Column }       from 'primereact/column'
import { DataTable }    from 'primereact/datatable'
import { Messages }     from 'primereact/messages'
import React, {
	useCallback,
	useContext,
	useEffect, useRef,
	useState,
}                       from 'react'
import { AuthContext }  from '../../../Context/AuthContext'
import { PageTitle }    from '../PageTitle'
import { deleteColumn } from './delete-column'
import { Header }       from './header'

export const GetAllYears = ( deleted ) => {
	// get the bearer token
	const { token } = useContext( AuthContext )

	// set columns to display
	const columns = [
		{
			field: 'year',
			header: 'Jaar',
			sortable: true,
			filter: true,
		},
	]

	// set initial states
	const [ selectedColumns, setSelectedColumns ] = useState( columns )
	const [ years, setYears ] = useState( [] )
	const message = useRef( null )

	// modify the amount of columns to show
	// @TODO: store in local storage so on refresh user selected columns are
	// still the same.
	const onColumnToggle = ( event ) => {
		let selectedColumns = event.value
		let orderedSelectedColumns = columns.filter( col => selectedColumns.some( sCol => sCol.field === col.field ) )
		setSelectedColumns( orderedSelectedColumns )
	}

	// fetch all years from database and only reinitialize when the token
	// changes
	const fetchResults = useCallback( async() => {
		try {
			const res = await axios.get( `${ process.env.REACT_APP_API_URL }/years`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Bearer ${ token }`,
				},

			} )

			if( !res ) return

			let years = []
			res.data.years.map( year => {
				return years.push( year )
			} )

			setYears( years )
		} catch( err ) {
			console.error( err )
		}
	}, [ token ] )


	// on mounting component call fetchResults and populate the vacations state
	useEffect( () => {
		return fetchResults()
	}, [ fetchResults, deleted ] )

	const handleDeleteYear = useCallback( async( evt ) => {
		console.log( evt.target.value )
		try {
			const res = await axios.delete( `${ process.env.REACT_APP_API_URL }/years/${ evt.target.value }`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Bearer ${ token }`,
				},

			} )

			if( res.status === 200 ) {
				message.current.show( [
					                      {
						                      severity: 'success',
						                      detail: 'De vakantie is succesvol verwijderd.',
					                      },
				                      ] )
				fetchResults()
			}
		} catch( err ) {
			console.error( err )
		}
	}, [ fetchResults, token ] )

	const columnComponents = selectedColumns.map( col => {
		return <Column
			key={ col.field }
			field={ col.field }
			header={ col.header }
			sortable={ col.sortable }
			filter={ col.filter }
		/>
	} )

	return (
		<div
			className={ 'd-flex flex-column p-5' }
			style={ { minHeight: 'calc(100vh - 59px)', height: '100%' } }
		>
			<PageTitle title={ 'Alle Jaren.' } />
			<Messages ref={ message } id={ 'message' } />

			<DataTable
				value={ years }
				header={ Header( selectedColumns, columns, onColumnToggle ) }
				removableSort
				paginator
				rows={ 10 }
				emptyMessage='Geen Jaren gevonden.'
				className={ 'mt-4' }
			>
				{ columnComponents }
				<Column
					field={ 'id' } header={ 'Delete' } body={ deleteColumn }
					sortable={ false }
					handleDeleteYear={ handleDeleteYear }
				/>
			</DataTable>
		</div>
	)
}