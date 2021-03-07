import React                from 'react'
import { Route, Switch }    from 'react-router-dom'
import { AddNewOrder }      from '../../Components/AdminComponents/AddNewOrder'
import { AddNewProduct }    from '../../Components/AdminComponents/AddNewProduct'
import { AddNewUser }       from '../../Components/AdminComponents/AddNewUser'
import { AddNewVacation }   from '../../Components/AdminComponents/AddNewVacation'
import { AddNewYear }       from '../../Components/AdminComponents/AddNewYear'
import { EditExistingUser } from '../../Components/AdminComponents/EditExistingUser'
import { GetAllUsers }      from '../../Components/AdminComponents/GetAllUsers'
import { AdminLayout }      from '../../Components/AdminComponents/Layout'

export const AdminDashboardPage = () => {

	return (
		<AdminLayout>
			<Switch>
				<Route
					path={ '/admin-dashboard/gebruikers' }
					component={ GetAllUsers }
					exact={ true }
				/>
				<Route
					path={ '/admin-dashboard/gebruikers/new' }
					component={ AddNewUser }
				/>
				<Route
					path={ '/admin-dashboard/gebruikers/edit' }
					component={ EditExistingUser }
				/>
				<Route
					path={ '/admin-dashboard/vakanties' }
					component={ AddNewVacation }
					exact={ true }
				/>
				<Route
					path={ '/admin-dashboard/producten' }
					component={ AddNewProduct }
					exact={ true }
				/>
				<Route
					path={ '/admin-dashboard/jaren' }
					component={ AddNewYear }
					exact={ true }
				/>
				<Route
					path={ '/admin-dashboard/opdrachten/new' }
					component={ AddNewOrder }
				/>
			</Switch>
		</AdminLayout>
	)
}