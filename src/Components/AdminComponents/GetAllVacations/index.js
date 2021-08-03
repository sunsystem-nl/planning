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

export const GetAllVacations = ( deleted ) => {
	// get the current year
	const currentYear = new Date().getFullYear()

	// get the bearer token
	const { token } = useContext( AuthContext )

	// set columns to display
	const columns = [
		{
			field: 'year',
			header: 'Jaar',
			sortable: false,
			filter: false,
		},
		{
			field: 'title',
			header: 'Omschrijving',
			sortable: true,
			filter: true,
		},
		{
			field: 'month',
			header: 'Maand',
			sortable: true,
			filter: true,
		},
		{
			field: 'week',
			header: 'Week',
			sortable: true,
			filter: true,
		},
		{
			field: 'day',
			header: 'Dag',
			sortable: true,
			filter: true,
		},
	]

	// set initial states
	const [ vacations, setVacations ] = useState( [] )
	const [ selectedColumns, setSelectedColumns ] = useState( columns )
	const [ year, setYear ] = useState( { jaar: currentYear } )
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

	// update year state when users changes year
	const handleChangeYear = useCallback( async( evt ) => setYear( evt.target.value ), [] )

	// fetch all years from database and only reinitialize when the token
	// changes
	const fetchYears = useCallback( async() => {
		try {
			const res = await axios.get( `${ process.env.REACT_APP_API_URL }/years`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ token }`,
				},

			} )

			if( !res ) return

			let years = []
			res.data.years.map( year => {
				return years.push( { jaar: year.year } )
			} )

			setYears( years )
		} catch( err ) {
			console.error( err )
		}
	}, [ token ] )

	// fetch all vacation days from the database and reinitialize when the
	// token or year state changes
	const fetchResults = useCallback( async() => {
		try {
			const res = await axios.get( `${ process.env.REACT_APP_API_URL }/vacation/year/${ year.jaar }`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ token }`,
				},

			} )
			const results = res.data
			let tempVacation = []
			results.forEach( vacation => {
				tempVacation.push( vacation )
			} )

			setVacations( tempVacation )
		} catch( err ) {
			console.error( err )
		}

	}, [ token, year ] )

	// on mounting component call fetchYears and populate the years state
	useEffect( () => {
		return fetchYears()
	}, [ fetchYears ] )

	// on mounting component call fetchResults and populate the vacations state
	useEffect( () => {
		return fetchResults()
	}, [ fetchResults, year, deleted ] )

	const handleDeleteVacation = useCallback( async( evt ) => {
		try {
			const res = await axios.delete( `${ process.env.REACT_APP_API_URL }/vacation/${ evt.target.value }`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ token }`,
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
			<PageTitle title={ 'Alle vakantie dagen.' } />
			<Messages ref={ message } id={ 'message' } />

			<DataTable
				value={ vacations }
				header={ Header( selectedColumns, columns, onColumnToggle, year, years, handleChangeYear ) }
				removableSort
				paginator
				rows={ 10 }
				emptyMessage='Geen Vakanties gevonden.'
				className={ 'mt-4' }
			>
				{ columnComponents }
				<Column
					field={ 'uid' } header={ 'Delete' } body={ deleteColumn }
					sortable={ false }
					handleDeleteVacation={ handleDeleteVacation }
				/>
			</DataTable>
		</div>
	)
}