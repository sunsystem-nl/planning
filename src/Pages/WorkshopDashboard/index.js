import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { WorkshopLayout } from '../../Components/WorkshopComponents/Layout'

import { GetAllPlanning } from '../../Components/AdminComponents/GetAllPlanning'
import { GetAllPlanningPantsers } from '../../Components/AdminComponents/GetAllPlanningPantsers'
import { GetAllPlanningWerkbank } from '../../Components/AdminComponents/GetAllPlanningWerkbank'
import { GetAllPlanningBediening } from '../../Components/AdminComponents/GetAllPlanningBediening'
import { GetAllPlanningDoneNotDelivered } from '../../Components/AdminComponents/GetAllPlanningDoneNotDelivered'
import { GetAllPlanningDoneAndDelivered } from '../../Components/AdminComponents/GetAllPlanningDoneAndDelivered'
import { GetAllPlanningThisWeek } from '../../Components/AdminComponents/GetAllPlanningThisWeek'

export const WorkshopDashboardPage = () => {
	return (
		<WorkshopLayout>
			<Switch>
				<Route
					path={'/workshop-dashboard/planning'}
					component={GetAllPlanning}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/pantsers'}
					component={GetAllPlanningPantsers}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/werkbank'}
					component={GetAllPlanningWerkbank}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/bediening'}
					component={GetAllPlanningBediening}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/klaar-niet-afgehaald'}
					component={GetAllPlanningDoneNotDelivered}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/klaar-en-afgehaald'}
					component={GetAllPlanningDoneAndDelivered}
					exact={true}
				/>
				<Route
					path={'/workshop-dashboard/planning/deze-week'}
					component={GetAllPlanningThisWeek}
					exact={true}
				/>
			</Switch>
		</WorkshopLayout>
	)
}