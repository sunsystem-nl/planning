import React, { useState }   from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { NavLink }           from 'react-router-dom'

export const Modal = ( { selectedUser, openModal, handleCloseModal } ) => {
	const [ activeIndex, setActiveIndex ] = useState( 1 )

	return (
		<div
			className={ openModal ? 'modal fade show' : 'modal fade' }
			id='exampleModal' tabIndex='-1'
			role='dialog' aria-labelledby='exampleModalLabel'
			aria-hidden='true'
			style={ openModal ? {
				display: 'block',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
			} : { display: 'none' } }
		>
			<div
				className='modal-dialog' role='document' style={ {
				top: '50%',
				transform: 'translateY(-50%)',
				width: '100%',
				maxWidth: '600px',
			} }
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5
							className='modal-title' id='exampleModalLabel'
						>{ selectedUser.naamLang }</h5>
						<button
							type='button' className='close'
							data-dismiss='modal' aria-label='Close'
							onClick={ handleCloseModal }
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='card'>
							<TabView
								activeIndex={ activeIndex }
								onTabChange={ ( e ) => setActiveIndex( e.index ) }
							>
								<TabPanel header='Adres gegevens'>
									<div className='row'>
										<div className='col-12'>
											<p>
												<strong>Straatnaam:</strong> { selectedUser.straatnaam }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Huisnummer:</strong> { selectedUser.huisnummer }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Postcode: </strong> { selectedUser.postcode }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Plaats: </strong> { selectedUser.plaats }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Land: </strong> { selectedUser.land }
											</p>
										</div>
									</div>
								</TabPanel>
								<TabPanel header='Bedrijfs gegevens'>
									<div className='row'>
										<div className='col-12'>
											<p>
												<strong>Contactpersoon: </strong> { selectedUser.contactpersoon }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Klantnummer: </strong> { selectedUser.klantnummer }
											</p>
										</div>
										<div className='col-12'>
											<p><strong>Naam
											           Kort: </strong> { selectedUser.naamKort }
											</p>
										</div>
										<div className='col-12'>
											<p><strong>Naam
											           Lang: </strong> { selectedUser.naamLang }
											</p>
										</div>
										<div className='col-12'>
											<p><strong>Telefoon
											           Mobiel: </strong> { selectedUser.telefoonMobiel }
											</p>
										</div>
										<div className='col-12'>
											<p><strong>Telefoon
											           Vast: </strong> { selectedUser.telefoonVast }
											</p>
										</div>
									</div>
								</TabPanel>
								<TabPanel header='Details'>
									<div className='row'>
										<div className='col-12'>
											<p>
												<strong>Email: </strong> { selectedUser.email }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Leverdag: </strong> { selectedUser.leverdag }
											</p>
										</div>
										<div className='col-12'>
											<p>
												<strong>Rol: </strong> { selectedUser.role }
											</p>
										</div>
									</div>
								</TabPanel>
							</TabView>
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-dismiss='modal'
							onClick={ handleCloseModal }
						>Close
						</button>
						<NavLink
							to={ {
								pathname: '/admin-dashboard/gebruikers/edit',
								state: selectedUser,
							} }
							className={ 'btn btn-warning' }
						>
							Edit</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}