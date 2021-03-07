import React       from 'react'
import { NavLink } from 'react-router-dom'

import { routes } from './routes.js'

export const AdminSidebarNav = () => {
	return (
		<div className='bg-light border-right mt-5 pb-5' id='sidebar-wrapper'>

			{ routes.map( ( route, index ) => {
				return (
					<div key={ index }>
						<div className='sidebar-heading'>{ route.heading }</div>

						<div className='list-group list-group-flush'>

							{ route.routes.map( ( item, i ) => {
								return (
									<NavLink
										to={ item.slug }
										className={ 'list-group-item list-group-item-action border-warning pl-5' }
										activeClassName={ 'list-group-item-warning' }
										exact
										key={ i }
									>{ item.title }</NavLink>
								)
							} ) }

						</div>
					</div>
				)
			} ) }
		</div>
	)
}