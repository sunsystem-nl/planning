import axios from 'axios'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Messages } from 'primereact/messages'
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Header } from './header'
import { PageTitle } from '../PageTitle'
import { Modal } from './modal'
import { NavLink } from 'react-router-dom'

export const GetAllOrdersByYear = () => {
	const currentYear = new Date().getFullYear()

	const columns = [
		{
			field: 'leverDatumJaar',
			header: 'Jaar',
			sortable: true,
			filter: true,
		},
		{
			field: 'leverDatumWeek',
			header: 'Week',
			sortable: true,
			filter: true,
		},
		{
			field: 'leverDatumDagText',
			header: 'Dag',
			sortable: true,
			filter: true,
		},
		{
			field: 'ordernummer',
			header: 'Opdracht Nummer',
			sortable: true,
			filter: true,
		},
		{
			field: 'klantNaamKort',
			header: 'Klant',
			sortable: true,
			filter: true,
		},
		{
			field: 'referentie',
			header: 'Referentie',
			sortable: true,
			filter: true,
		},
		{
			field: 'productAantal',
			header: 'Aantal',
			sortable: true,
			filter: true,
		},
		{
			field: 'productNaam',
			header: 'Soort',
			sortable: true,
			filter: true,
		},
	]

	// get the bearer token
	const { token } = useContext(AuthContext)
	const [orders, setOrders] = useState([])
	const [selectedColumns, setSelectedColumns] = useState(columns)
	const [selectedOrder, setSelectedOrder] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [years, setYears] = useState([])
	const message = useRef(null)

	const fetchResults = useCallback(async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${selectedYear}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},

			})

			if (!res) return
			setOrders(res.data)
		} catch (err) {
			console.error('ERROR: ', err)
		}
	}, [token, selectedYear])

	useEffect(() => {
		const subscribe = fetchResults()
		return subscribe
	}, [fetchResults])

	// fetch all years from database and only reinitialize when the token
	// changes
	const fetchYears = useCallback(async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/years`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},

			})

			setYears(res.data.years)
		} catch (err) {
			console.error(err)
		}
	}, [token])


	// on mounting component call fetchResults and populate the vacations state
	useEffect(() => {
		const subscribeYears = fetchYears()
		return subscribeYears
	}, [fetchYears])


	// modify the amount of columns to show
	// @TODO: store in local storage so on refresh user selected columns are
	// still the same.
	const onColumnToggle = (event) => {
		let selectedColumns = event.value
		let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field))
		setSelectedColumns(orderedSelectedColumns)
	}

	const columnComponents = selectedColumns.map(col => {
		return <Column
			key={col.field}
			field={col.field}
			header={col.header}
			sortable={col.sortable}
			filter={col.filter}
		/>
	})

	const gereedBodyTemplate = (rowData) => {
		return rowData.statusGereed ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>
	}

	const afgehaaldBodyTemplate = (rowData) => {
		return rowData.statusAfgehaald ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>
	}

	const handleCloseModal = () => {
		setOpenModal(!openModal)
	}

	const onRowSelect = evt => {
		setSelectedOrder(evt.data)
		setOpenModal(!openModal)
	}

	const editOrderBodyTemplate = (rowData) => {
		return <NavLink
			to={{
				pathname: '/admin-dashboard/opdrachten/edit',
				state: rowData
			}}
			className={'btn btn-warning'}>Edit</NavLink>
	}

	return (
		<div
			className={'d-flex flex-column p-5'}
			style={{ minHeight: 'calc(100vh - 59px)', height: '100%' }}
		>
			<PageTitle title={`Alle Opdrachten voor  ${selectedYear}.`} />
			<Messages ref={message} id={'message'} />

			<DataTable
				value={orders}
				header={Header(selectedColumns, columns, onColumnToggle, years, selectedYear, setSelectedYear)}
				removableSort
				sortField='leverDatumWeek'
				sortOrder={-1}
				paginator
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
				rows={10}
				rowsPerPageOptions={[10, 20, 50, orders.length]}
				emptyMessage='Geen Opdrachten gevonden.'
				className={'mt-4'}
				scrollable
				scrollHeight={'800px'}
				selection={selectedOrder}
				onSelectionChange={e => setSelectedOrder(e.value)}
				selectionMode='single'
				dataKey='orderID'
				onRowSelect={onRowSelect}
			>
				{columnComponents}
				<Column field="statusGereed" header="Gereed" body={gereedBodyTemplate} sortable filter></Column>
				<Column field="statusAfgehaald" header="Afgehaald" body={afgehaaldBodyTemplate} sortable filter></Column>
				<Column header='Edit' body={editOrderBodyTemplate}></Column>
			</DataTable>
			{selectedOrder && (<Modal selectedOrder={selectedOrder} openModal={openModal} handleCloseModal={handleCloseModal} />)}
		</div>
	)
}