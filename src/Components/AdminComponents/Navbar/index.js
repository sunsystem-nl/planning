import React, { useContext } from 'react'
import Button                from 'react-bootstrap/Button'
import { AuthContext }       from '../../../Context/AuthContext'

export const AdminNavBar = ( { closeSidenav, isOpen } ) => {

	const { logout } = useContext( AuthContext )

	const handleLogout = async( evt ) => {
		evt.preventDefault()

		try {
			await logout()
		} catch( err ) {
			console.log( err )
		}
	}

	return (
		<nav
			className='navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top'
		>
			<button
				className='btn' id='menu-toggle'
				onClick={ closeSidenav }
			>{ isOpen ? ( <i
				className='pi pi-angle-left' style={ { 'fontSize': '1.5em' } }
			/> ) : ( <i
				className='pi pi-angle-right' style={ { 'fontSize': '1.5em' } }
			/> ) }
			</button>

			<div
				className='collapse navbar-collapse' id='navbarSupportedContent'
			>
				<ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
					<li className='nav-item active'>
						<Button
							variant='warning'
							type='submit'
							onClick={ handleLogout }
						>
							Logout
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	)
}