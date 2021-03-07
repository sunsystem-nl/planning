import React, { useContext } from 'react'
import { Redirect, Route }   from 'react-router-dom'
import { AuthContext }       from '../../Context/AuthContext'

export const PrivateRoute = ( { component: Component, roles, ...rest } ) => {
	const { currentUser } = useContext( AuthContext )

	return (
		<Route { ...rest } render={ props => {

			if( !currentUser ) {
				// not logged in so redirect to login page with the return url
				return <Redirect
					to={ { pathname: '/', state: { from: props.location } } }
				/>
			}

			// authorised so return component
			return <Component { ...props } />
		} }
		/>
	)
}