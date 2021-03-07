import React, { useState } from 'react'
import { AdminNavBar }     from '../Navbar'
import { AdminSidebarNav } from '../SidebarNav'

import './index.css'

export const AdminLayout = ( { children } ) => {
	const [ isOpen, setIsOpen ] = useState( true )

	const handleCloseSideNav = () => {
		setIsOpen( !isOpen )
	}

	return (
		<div
			className={ isOpen ? 'd-flex' : 'd-flex toggled' } id={ 'wrapper' }
		>
			<AdminSidebarNav />

			<div id='page-content-wrapper'>
				<AdminNavBar
					closeSidenav={ handleCloseSideNav } isOpen={ isOpen }
				/>
				<div className='container-fluid mt-5'>
					{ children }
				</div>
			</div>
		</div>
	)
}