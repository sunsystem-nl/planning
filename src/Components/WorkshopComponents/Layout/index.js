import React, { useState } from 'react'
import { WorkshopNavBar } from '../Navbar'
import { WorkshopSidebarNav } from '../SidebarNav'

import './index.css'

export const WorkshopLayout = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true)

	const handleCloseSideNav = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div
			className={isOpen ? 'd-flex' : 'd-flex toggled'} id={'wrapper'}
		>
			<WorkshopSidebarNav />

			<div id='page-content-wrapper'>
				<WorkshopNavBar closeSidenav={handleCloseSideNav} isOpen={isOpen} />
				<div className='container-fluid mt-5'>
					{children}
				</div>
			</div>
		</div >
	)
}