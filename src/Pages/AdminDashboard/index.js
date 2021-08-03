import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AddNewOrder } from '../../Components/AdminComponents/AddNewOrder'
import { AddNewProduct } from '../../Components/AdminComponents/AddNewProduct'
import { AddNewUser } from '../../Components/AdminComponents/AddNewUser'
import { AddNewVacation } from '../../Components/AdminComponents/AddNewVacation'
import { AddNewYear } from '../../Components/AdminComponents/AddNewYear'
import { EditExistingUser } from '../../Components/AdminComponents/EditExistingUser'
import { GetAllUsers } from '../../Components/AdminComponents/GetAllUsers'
import { AdminLayout } from '../../Components/AdminComponents/Layout'
import { GetAllOrdersByYear } from '../../Components/AdminComponents/GetAllOrdersByYear'
import { GetAllPlanning } from '../../Components/AdminComponents/GetAllPlanning'
import { GetAllPlanningDoneNotDelivered } from '../../Components/AdminComponents/GetAllPlanningDoneNotDelivered'
import { GetAllPlanningDoneAndDelivered } from '../../Components/AdminComponents/GetAllPlanningDoneAndDelivered'
import { GetAllPlanningThisWeek } from '../../Components/AdminComponents/GetAllPlanningThisWeek'
import { GetAllPlanningWerkbank } from '../../Components/AdminComponents/GetAllPlanningWerkbank'
import { GetAllPlanningBediening } from '../../Components/AdminComponents/GetAllPlanningBediening'
import { GetAllPlanningPantsers } from '../../Components/AdminComponents/GetAllPlanningPantsers'
import { EditExistingOrder } from '../../Components/AdminComponents/EditExistingOrder'

export const AdminDashboardPage = () => {

	return (
		<AdminLayout>
			<Switch>
				<Route
					path={'/admin-dashboard/gebruikers'}
					component={GetAllUsers}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/gebruikers/new'}
					component={AddNewUser}
				/>
				<Route
					path={'/admin-dashboard/gebruikers/edit'}
					component={EditExistingUser}
				/>
				<Route
					path={'/admin-dashboard/vakanties'}
					component={AddNewVacation}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/producten'}
					component={AddNewProduct}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/jaren'}
					component={AddNewYear}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/opdrachten'}
					component={GetAllOrdersByYear}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/opdrachten/new'}
					component={AddNewOrder}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/opdrachten/edit'}
					component={EditExistingOrder}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning'}
					component={GetAllPlanning}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/werkbank'}
					component={GetAllPlanningWerkbank}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/bediening'}
					component={GetAllPlanningBediening}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/pantsers'}
					component={GetAllPlanningPantsers}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/klaar-niet-afgehaald'}
					component={GetAllPlanningDoneNotDelivered}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/klaar-en-afgehaald'}
					component={GetAllPlanningDoneAndDelivered}
					exact={true}
				/>
				<Route
					path={'/admin-dashboard/planning/deze-week'}
					component={GetAllPlanningThisWeek}
					exact={true}
				/>
			</Switch>
		</AdminLayout>
	)
}