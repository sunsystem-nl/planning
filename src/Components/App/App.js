import React                     from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
}                                from 'react-router-dom'
import { AuthProvider }          from '../../Context/AuthContext'
import { AdminDashboardPage }    from '../../Pages/AdminDashboard'
import { ClientDashboardPage }   from '../../Pages/ClientDashboard'
import LoginPage                 from '../../Pages/Login'
import { WorkshopDashboardPage } from '../../Pages/WorkshopDashboard'
import { PrivateRoute }          from '../PrivateRoute'

export const App = () => {
	return (
		<AuthProvider>

			<Router>
				<Switch>
					<Route
						exact={ true } path={ '/' } component={ LoginPage }
					/>
					<PrivateRoute
						path={ '/client-dashboard' }
						component={ ClientDashboardPage }
					/>
					<PrivateRoute
						path={ '/workshop-dashboard' }
						component={ WorkshopDashboardPage }
					/>
					<PrivateRoute
						path={ '/admin-dashboard' }
						component={ AdminDashboardPage }
					/>
				</Switch>
			</Router>
		</AuthProvider>
	)
}
