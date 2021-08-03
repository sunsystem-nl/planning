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
import { deleteColumn } from './delete-column'
import { Header } from './header'
import { PageTitle } from '../PageTitle'

export const GetAllProducts = (deleted) => {
	const columns = [
		{
			field: 'productNaamSingular',
			header: 'Singular',
			sortable: true,
			filter: true,
		},
		{
			field: 'productNaamPlural',
			header: 'Plural',
			sortable: true,
			filter: true,
		},
	]

	// get the bearer token
	const { token } = useContext(AuthContext)
	const [products, setProducts] = useState([])
	const [selectedColumns, setSelectedColumns] = useState(columns)
	const message = useRef(null)

	const fetchResults = useCallback(async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},

			})

			if (!res) return

			let products = []
			res.data.products.map(product => {
				return products.push(product)
			})

			setProducts(products)
		} catch (err) {
			console.error('ERROR: ', err)
		}
	}, [token])

	useEffect(() => fetchResults(), [fetchResults, deleted])

	const handleDeleteProduct = useCallback(async (evt) => {
		try {
			const res = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${evt.target.value}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},

			})

			if (res.status === 200) {
				message.current.show([
					{
						severity: 'success',
						detail: 'Het product is succesvol verwijderd.',
					},
				])
				fetchResults()
			}
		} catch (err) {
			console.error(err)
		}
	}, [fetchResults, token])

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

	return (
		<div
			className={'d-flex flex-column p-5'}
			style={{ minHeight: 'calc(100vh - 59px)', height: '100%' }}
		>
			<PageTitle title={'Alle producten.'} />
			<Messages ref={message} id={'message'} />

			<DataTable
				value={products}
				header={Header(selectedColumns, columns, onColumnToggle)}
				removableSort
				paginator
				rows={10}
				emptyMessage='Geen Producten gevonden.'
				className={'mt-4'}
			>
				{columnComponents}
				<Column
					field={'uid'} header={'Delete'} body={deleteColumn}
					sortable={false}
					handleDeleteProduct={handleDeleteProduct}
				/>
			</DataTable>
		</div>
	)
}