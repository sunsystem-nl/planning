import React, { useContext } from 'react'
import Button                from 'react-bootstrap/Button'
import { AuthContext }       from '../../Context/AuthContext'

export const WorkshopDashboardPage = () => {
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
		<>
			<h1>workshop dashboard page</h1>
			<Button
				variant='primary'
				type='submit'
				onClick={ handleLogout }
			>
				Logout
			</Button>
		</>
	)
}