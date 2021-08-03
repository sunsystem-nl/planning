import React from 'react'
import { NavLink } from 'react-router-dom'

export const Modal = ({ selectedOrder, openModal, handleCloseModal }) => {

	const { ordernummer, klantNaamKort, referentie, leverDatumDag, leverDatumDagText, leverDatumJaar, leverDatumWeek, leverDatumMaand, opmerking, productAantal, productNaam, urgent, statusAfgehaald, statusBediening, statusGeleiders, statusGereed, statusIngetrokken, statusKast, statusKastGereed, statusPantser } = selectedOrder
	return (
		<div
			className={openModal ? 'modal fade show' : 'modal fade'}
			id='orderModal' tabIndex='-1'
			role='dialog' aria-labelledby='orderModalLabel'
			aria-hidden='true'
			style={openModal ? {
				display: 'block',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
			} : { display: 'none' }}
		>
			<div
				className='modal-dialog' role='document' style={{
					top: '50%',
					transform: 'translateY(-50%)',
					width: '100%',
					maxWidth: '960px',
				}}
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5
							className='modal-title' id='orderModalLabel'
						>Opdracht {ordernummer} voor {klantNaamKort} referentie {referentie}</h5>
						<button
							type='button' className='close'
							data-dismiss='modal' aria-label='Close'
							onClick={handleCloseModal}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='card' style={{ border: '0px' }}>
							<ul className="list-group border-0 rounded-0">
								<li className="list-group-item border-top-0 border-right-0 border-left-0 border-bottom mb-2">
									Staat op de planning voor {leverDatumDagText} {leverDatumDag}-{leverDatumMaand}-{leverDatumJaar} in week {leverDatumWeek}.
								</li>
								<li className="list-group-item border-top-0 border-right-0 border-left-0 border-bottom mb-2">
									Deze opdracht bestaat uit {productAantal} {productNaam}.
								</li>
								{opmerking !== '' ? <li className="list-group-item border-top-0 border-right-0 border-left-0 border-bottom mb-2" dangerouslySetInnerHTML={{ __html: opmerking }} /> : <></>}
							</ul>
							<table className="mt-5 table border-0">
								<thead>
									<tr>
										<th scope="col">Pantser</th>
										<th scope="col">Kast gezaagd</th>
										<th scope="col">Kast klaar</th>
										<th scope="col">Pantser in kast</th>
										<th scope="col">Geleiders</th>
										<th scope="col">Bediening</th>
										<th scope="col">Urgent</th>
										<th scope="col">Gereed</th>
										<th scope="col">Afgehaald</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">{statusPantser ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</th>
										<td>{statusKast ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusKastGereed ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusIngetrokken ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusGeleiders ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusBediening ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{urgent ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusGereed ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
										<td>{statusAfgehaald ? <i className="pi pi-check p-mr-2" style={{ 'color': 'green' }}></i> : <i className="pi pi-times p-mr-2" style={{ 'color': 'red' }}></i>}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-dismiss='modal'
							onClick={handleCloseModal}
						>Close
						</button>
						<NavLink
							to={{
								pathname: '/admin-dashboard/opdrachten/edit',
								state: selectedOrder,
							}}
							className={'btn btn-warning'}
						>
							Edit</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}