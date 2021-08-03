import axios from 'axios'
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import moment from 'moment'

import { AuthContext } from '../../../Context/AuthContext'
import { PageTitle } from '../PageTitle'
import { Header } from './header'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox';
import { confirmDialog } from 'primereact/confirmdialog';
import { Messages } from 'primereact/messages'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';

export const GetAllPlanningWerkbank = () => {
	const currentYear = new Date().getFullYear()
	const date = new Date().toISOString()
	const currentWeek = moment(date).isoWeek()

	const { token } = useContext(AuthContext)

	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [selectedWeek, setSelectedWeek] = useState(currentWeek)
	const [weeks, setWeeks] = useState([])
	const [years, setYears] = useState([])
	const [orders, setOrders] = useState([])
	const message = useRef(null)

	const getWeekNumbers = () => {

		// Get first day of year
		const startWeek = 1

		const endWeek = moment().year(selectedYear).isoWeeksInYear()

		let Weeks = []

		for (let i = startWeek; i <= endWeek; i++) {
			Weeks.push({ id: i, value: i })
		}
		setWeeks(Weeks)
	}

	const columns = [
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
			header: 'Num.',
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
			header: 'Ref.',
			sortable: true,
			filter: true,
		},
		{
			field: 'productAantal',
			header: 'Aant.',
			sortable: true,
			filter: true,
		},
		{
			field: 'productNaam',
			header: 'Soort',
			sortable: true,
			filter: true,
		},
		{
			field: 'statusPantser',
			header: 'Pant.',
			sortable: true,
			filter: true,
		},
		{
			field: 'statusKast',
			header: 'Kast',
			sortable: true,
			filter: true,
		},
		{
			field: 'statusKastGereed',
			header: 'K Ger.',
			sortable: true,
			filter: true,
		},
		{
			field: 'statusIngetrokken',
			header: 'P in K',
			sortable: true,
			filter: true
		},
		{
			field: 'statusGeleiders',
			header: 'Geleid.',
			sortable: true,
			filter: true
		},
		{
			field: 'statusBediening',
			header: 'Bedien.',
			sortable: true,
			filter: true
		},
		{
			field: 'statusAfgehaald',
			header: 'Afgehaald',
			sortable: true,
			filter: true
		},
		{
			field: 'statusGereed',
			header: 'Gereed',
			sortable: true,
			filter: true
		}
	]

	const [selectedColumns, setSelectedColumns] = useState(JSON.parse(localStorage.getItem('columnsAllPlanningWerkbank')) || columns)
	const [selectedOrder, setSelectedOrder] = useState(null)

	const updateOrder = useCallback(async (data) => {
		try {
			const body = JSON.stringify({ ...data })

			await axios.patch(`${process.env.REACT_APP_API_URL}/orders/${selectedYear}/${data.leverDatumWeek}/${data.orderID}/status`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})

		} catch (err) {
			console.log(err)
		}
		// eslint-disable-next-line
	}, [token])

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
		// eslint-disable-next-line
	}, [token])


	// on mounting component call fetchResults and populate the vacations state
	useEffect(() => {
		const yearsSubscription = fetchYears()
		return yearsSubscription
	}, [fetchYears])


	const onColumnToggle = (event) => {
		let selectedColumns = event.value
		let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field))

		setSelectedColumns(orderedSelectedColumns)

		localStorage.setItem('columnsAllPlanningWerkbank', JSON.stringify(selectedColumns))
	}

	// pantser
	// eslint-disable-next-line
	const [pansterGereed, setPansterGereed] = useState(false)
	const updatePantserStatus = async (e, data) => {
		if (data['statusPantser'] === false) {
			data['statusPantser'] = true
			setPansterGereed(true)
		} else {
			data['statusPantser'] = false
			setPansterGereed(false)
		}

		await updateOrder(data)
		await fetchResults()
	}

	const pansterBodyTemplate = (rowData) => {
		return rowData.statusPantser ? <Checkbox id='pantser' onChange={e => updatePantserStatus(e, rowData)} checked={true} /> :
			<Checkbox id='pantser' onChange={e => updatePantserStatus(e, rowData)} checked={false} />
	}

	// kast gezaagd
	// eslint-disable-next-line
	const [kastGereed, setKastGereed] = useState(false)
	const updateKastStatus = async (e, data) => {
		if (data['statusKast'] === false) {
			data['statusKast'] = true
			setKastGereed(true)
		} else {
			data['statusKast'] = false
			setKastGereed(false)
		}

		await updateOrder(data)
		await fetchResults()
	}

	const kastBodyTemplate = (rowData) => {
		return rowData.statusKast ? <Checkbox id='kast' onChange={e => updateKastStatus(e, rowData)} checked={true} /> :
			<Checkbox id='kast' onChange={e => updateKastStatus(e, rowData)} checked={false} />
	}

	// kast gereed
	// eslint-disable-next-line
	const [kastGereedGereed, setKastGereedGereed] = useState(false)
	const updateKastGereedStatus = async (e, data) => {
		if (data['statusKastGereed'] === false) {
			data['statusKastGereed'] = true
			setKastGereedGereed(true)
		} else {
			data['statusKastGereed'] = false
			setKastGereedGereed(false)
		}

		await updateOrder(data)
		await fetchResults()
	}

	const kastGereedBodyTemplate = (rowData) => {
		return rowData.statusKastGereed ? <Checkbox id='kastGereed' onChange={e => updateKastGereedStatus(e, rowData)} checked={true} /> :
			<Checkbox id='kastGereed' onChange={e => updateKastGereedStatus(e, rowData)} checked={false} />
	}

	// ingetrokken
	// eslint-disable-next-line
	const [ingetrokkenGereed, setIngetrokkenGereed] = useState(false)
	const updateIngetrokkenStatus = async (e, data) => {
		if (data['statusIngetrokken'] === false) {
			data['statusIngetrokken'] = true
			setIngetrokkenGereed(true)
		} else {
			data['statusIngetrokken'] = false
			setIngetrokkenGereed(false)
		}

		await updateOrder(data)
		await fetchResults()
	}

	const ingetrokkenBodyTemplate = (rowData) => {
		return rowData.statusIngetrokken ? <Checkbox id='ingetrokken' onChange={e => updateIngetrokkenStatus(e, rowData)} checked={true} /> :
			<Checkbox id='ingetrokken' onChange={e => updateIngetrokkenStatus(e, rowData)} checked={false} />
	}

	// geleiders
	// eslint-disable-next-line
	const [geleidersGereed, setGeleidersGereed] = useState()
	const updateGeleidersStatus = async (e, data) => {
		if (data['statusGeleiders'] === false) {
			data['statusGeleiders'] = true
			setGeleidersGereed(true)
		} else {
			data['statusGeleiders'] = false
			setGeleidersGereed(false)
		}

		await updateOrder(data)
		await fetchResults()
	}

	const geleidersBodyTemplate = (rowData) => {
		return rowData.statusGeleiders ? <Checkbox id='geleiders' onChange={e => updateGeleidersStatus(e, rowData)} checked={true} /> :
			<Checkbox id='geleiders' onChange={e => updateGeleidersStatus(e, rowData)} checked={false} />
	}

	// bediening
	// eslint-disable-next-line
	const [bedieningGereed, setBedieningGereed] = useState()
	const [orderNummer, setOrdernummer] = useState()
	const [klantNaam, setKlantNaam] = useState()
	const [referentie, setReferentie] = useState()

	const print = () => {
		const content = document.getElementById('content')
		const pri = document.getElementById("ifmcontentstoprint").contentWindow;
		pri.document.open();
		pri.document.write(content.innerHTML);
		pri.document.close();
		pri.focus();
		pri.print();
	}

	const reject = () => {

	}

	const confirmBediening = (data) => {
		confirmDialog({
			message: `${data.ordernummer} / ${data.klantNaamKort} / ${data.referentie}`,
			header: 'Print label!',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Print Label',
			rejectLabel: 'Cancel',
			accept: () => print(),
			reject: () => reject()
		});
	}

	const updateBedieningStatus = async (e, data) => {
		if (data['statusBediening'] === false) {
			data['statusBediening'] = true
			setBedieningGereed(true)
			confirmBediening(data)
			setOrdernummer(data.ordernummer)
			setKlantNaam(data.klantNaamKort)
			setReferentie(data.referentie)
		} else {
			data['statusBediening'] = false
			setBedieningGereed(false)
		}
		await updateOrder(data)
		await fetchResults()
	}

	const bedieningBodyTemplate = (rowData) => {
		return rowData.statusBediening ? <Checkbox id='bediening' onChange={e => updateBedieningStatus(e, rowData)} checked={true} /> :
			<Checkbox id='bediening' onChange={e => updateBedieningStatus(e, rowData)} checked={false} />
	}

	// afgehaald
	// eslint-disable-next-line
	const [afgehaaldGereed, setAfgehaaldGereed] = useState()
	const updateAfgehaaldStatus = async (e, data) => {
		if (data['statusAfgehaald'] === false) {
			data['statusAfgehaald'] = true
			setAfgehaaldGereed(true)
		} else {
			data['statusAfgehaald'] = false
			setAfgehaaldGereed(false)
		}
		await updateOrder(data)
		await fetchResults()
	}

	const afgehaaldBodyTemplate = (rowData) => {
		return rowData.statusAfgehaald ? <Checkbox id='afgehaald' onChange={e => updateAfgehaaldStatus(e, rowData)} checked={true} /> :
			<Checkbox id='afgehaald' onChange={e => updateAfgehaaldStatus(e, rowData)} checked={false} />
	}

	// gereed
	const email = async (data) => {
		try {
			const body = JSON.stringify({ ...data })

			const result = await axios.post(`${process.env.REACT_APP_API_URL}/email`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})

			if (result.status === 200) {
				message.current.show([
					{
						severity: 'success',
						detail: 'De email is verstuurd.',
					},
				])
			}

		} catch (err) {
			message.current.show([
				{
					severity: 'error',
					detail: err.message,
				},
			])
		}
	}

	const confirmGereed = (data) => {
		confirmDialog({
			message: `
			Controlle voor opdracht van ${data.klantNaamKort} met opdrachtnummer ${data.ordernummer} en referentie ${data.referentie} is deze klaar?`,
			header: 'Verzend Email naar klant.',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Stuur email',
			rejectLabel: 'Cancel',
			accept: () => email(data),
			reject: () => reject()
		});
	}

	const opdrachtNietCompleet = (data) => {
		confirmDialog({
			message: `
			De opdracht van ${data.klantNaamKort} met opdrachtnummer ${data.ordernummer} en referentie ${data.referentie} is nog niet klaar!`,
			header: 'Opdracht niet klaar!',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: "OK",
			rejectClassName: "invisible",
			accept: () => reject(),
			reject: () => reject()
		});
	}

	// eslint-disable-next-line
	const [gereed, setGereed] = useState()
	const updateGereedStatus = async (e, data) => {
		if (
			data['statusPantser'] === false ||
			data['statusKast'] === false ||
			data['statusKastGereed'] === false ||
			data['statusIngetrokken'] === false ||
			data['statusGeleiders'] === false ||
			data['statusBediening'] === false
		) {
			if (data['statusGereed'] === true) {
				data['statusGereed'] = false
				setGereed(false)
			} else {
				opdrachtNietCompleet(data)
				return
			}
		} else {
			if (data['statusGereed'] === false) {
				data['statusGereed'] = true
				setGereed(true)
				if (data['klantWilEmail'] === true) {
					confirmGereed(data)
				}
			} else {
				data['statusGereed'] = false
				setGereed(false)
			}
			await updateOrder(data)
			await fetchResults()
		}
	}

	const gereedBodyTemplate = (rowData) => {
		return rowData.statusGereed ? <Checkbox id='gereed' onChange={e => updateGereedStatus(e, rowData)} checked={true} /> :
			<Checkbox id='gereed' onChange={e => updateGereedStatus(e, rowData)} checked={false} />
	}

	const [displayEditModal, setDisplayEditModal] = useState(false)
	const [editSelectedOrder, setEditSelectedOrder] = useState(null)
	const [opmerking, setOpmerking] = useState(null)
	const showEditModal = (rowData) => {
		setDisplayEditModal(true);

		SetOrder(rowData)
	}

	const SetOrder = (rowData) => {
		setEditSelectedOrder(rowData)
		setOpmerking(rowData.opmerking)
	}

	const onHide = () => {
		setDisplayEditModal(false);
	}

	const updateOpmerking = () => {
		console.log(opmerking)
		editSelectedOrder.opmerking = opmerking

		updateOrder(editSelectedOrder)
		fetchResults()
		setDisplayEditModal(false)
	}

	const renderFooter = () => {
		return (
			<div>
				<Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={() => onHide()} />
				<Button label="Update" icon="pi pi-check" className="p-button-success" onClick={() => updateOpmerking()} autoFocus />
			</div>
		);
	}

	const orderNummerBodyTemplate = (rowData) => {
		return <Button label={rowData.ordernummer.toString()} className={rowData.opmerking === null ? 'text-warning p-button-text' : 'p-button-danger p-button'} onClick={() => showEditModal(rowData)} />
	}

	const header = (
		<span className="ql-formats">
			<button className="ql-bold" aria-label="Bold"></button>
			<button className="ql-italic" aria-label="Italic"></button>
			<button className="ql-underline" aria-label="Underline"></button>
			<select className="ql-color" aria-label="Color"></select>
			<select className="ql-background" aria-label="background"></select>
		</span>
	);

	const referentieBodyTemplate = (rowData) => {
		return <p className={rowData.urgent === true ? "bg-success p-2 pb-0 text-white" : "p-2 pb-0"}>{rowData.referentie}</p>
	}

	const leverDatumDagBodyTemplate = (rowData) => {
		switch (rowData.leverDatumDagText) {
			case 'Maandag':
				return <p>Ma</p>
			case 'Dinsdag':
				return <p>Di</p>
			case 'Woensdag':
				return <p>Wo</p>
			case 'Donderdag':
				return <p>Do</p>
			case 'Vrijdag':
				return <p>Vr</p>
			case 'Zaterdag':
				return <p>Za</p>
			case 'Zondag':
				return <p>Zo</p>
			default:
				return
		}
	}

	const columnComponents = selectedColumns.map(col => {

		if (col.field === 'statusPantser') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={pansterBodyTemplate}>
			</Column>
		} else if (col.field === 'statusKast') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={kastBodyTemplate}>
			</Column>
		} else if (col.field === 'statusKastGereed') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={kastGereedBodyTemplate}>
			</Column>
		} else if (col.field === 'statusIngetrokken') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={ingetrokkenBodyTemplate}>
			</Column>
		} else if (col.field === 'statusGeleiders') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={geleidersBodyTemplate}>
			</Column>
		} else if (col.field === 'statusBediening') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={bedieningBodyTemplate}>
			</Column>
		} else if (col.field === 'statusAfgehaald') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={afgehaaldBodyTemplate}>
			</Column>
		} else if (col.field === 'statusGereed') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={gereedBodyTemplate}>
			</Column>
		} else if (col.field === 'ordernummer') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={orderNummerBodyTemplate}>
			</Column>
		} else if (col.field === 'referentie') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={referentieBodyTemplate}>
			</Column>
		} else if (col.field === 'leverDatumDagText') {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				body={leverDatumDagBodyTemplate}>
			</Column>
		} else {
			return <Column
				key={col.field}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
			/>
		}
	})

	const fetchResults = useCallback(async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${selectedYear}/${selectedWeek}`, {
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
		// eslint-disable-next-line
	}, [token, selectedYear, selectedWeek])

	useEffect(() => {
		const weeksSubscription = getWeekNumbers()
		return weeksSubscription
		// eslint-disable-next-line
	}, [selectedYear])

	useEffect(() => {
		const resultsSubscribtion = fetchResults()
		return resultsSubscribtion
		// eslint-disable-next-line
	}, [fetchResults, selectedYear, selectedWeek])

	return (
		<div
			className={'d-flex flex-column pt-3 pb-5'}
			style={{ minHeight: 'calc(100vh - 59px)', height: '100%' }}
		>
			<PageTitle title={`Werkbank planning voor ${selectedYear} week ${selectedWeek}.`} />
			<Messages ref={message} id={'message'} />
			<iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', fontSize: '30rem' }} title='getallplanningwerkbank'></iframe>
			<h1 style={{ display: 'none' }} id="content">{orderNummer} / {klantNaam} / {referentie}</h1>
			<Dialog header={`Voeg een opmerking toe!`} visible={displayEditModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide()}>
				<label htmlFor="opmerking">Opmerking</label>
				<Editor style={{ height: '120px' }} value={opmerking} onTextChange={(e) => setOpmerking(e.htmlValue)} headerTemplate={header} name={'opmerking'} id={'opmerking'} />
			</Dialog>
			<DataTable
				value={orders}
				header={Header(selectedColumns, columns, onColumnToggle, years, selectedYear, setSelectedYear, weeks, setSelectedWeek, selectedWeek)}
				removableSort
				sortField='leverDatumWeek'
				sortOrder={-1}
				paginator
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
				scrollable
				scrollHeight='400px'
				rows={orders.length || 10}
				rowsPerPageOptions={[10, 20, 50, orders.length]}
				emptyMessage='Geen Opdrachten gevonden.'
				className={'mt-1 responsive-table'}
				selection={selectedOrder}
				onSelectionChange={e => setSelectedOrder(e.value)}
				selectionMode='single'
				dataKey='orderID'
			>
				{columnComponents}
			</DataTable>
		</div>
	)

}