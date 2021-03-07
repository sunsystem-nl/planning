import axios               from 'axios'
import moment              from 'moment'
import { Messages }        from 'primereact/messages'
import React, {
	useContext,
	useRef,
	useState,
}                          from 'react'
import { AuthContext }     from '../../../Context/AuthContext'
import { GetAllVacations } from '../GetAllVacations'
import { PageTitle }       from '../PageTitle'
import { AddVacationForm } from '../VacationForm/form'

export const AddNewVacation = () => {
	const today = new Date()

	const { token } = useContext( AuthContext )
	const message = useRef( null )

	const formatted = moment( today ).format( 'YYYY/MM/DD' )
	const [ date, setDate ] = useState( formatted )
	const [ title, setTitle ] = useState( '' )
	const [ deleted, setDeleted ] = useState( null )

	const handleChangeTitle = ( evt ) => setTitle( evt.target.value )

	const handleChangeDate = ( evt ) => setDate( moment( evt.target.value ).format( 'YYYY/MM/DD' ) )

	const submitForm = async( evt ) => {
		evt.preventDefault()
		setDeleted( false )

		const body = JSON.stringify( {
			                             date: date,
			                             title: title,
		                             } )

		try {
			const response = await axios.post( `${ process.env.REACT_APP_API_URL }/vacation`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Bearer ${ token }`,
				},
			} )

			if( response.status === 200 ) {
				message.current.show( [
					                      {
						                      severity: 'success',
						                      detail: response.data.message,
					                      },
				                      ] )
				setDeleted( true )
			}

		} catch( err ) {
			message.current.show( [
				                      {
					                      severity: 'error',
					                      detail: 'Deze vakantie dag staat al in de database.',
				                      },
			                      ] )
			setDeleted( false )
		}
	}

	return (
		<>
			<div
				className={ 'd-flex flex-column pt-5 pb-5' }
				style={ { minHeight: 'calc(100vh - 59px)', height: '100%' } }
			>
				<div
					style={ {
						maxWidth: '900px',
						margin: '0',
						width: '100%',
					} }
					className={ 'pl-5' }
				>
					<PageTitle title={ 'Voeg een nieuwe vakantie toe.' } />
					<Messages ref={ message } id={ 'message' } />
					<AddVacationForm
						submitForm={ submitForm } date={ date }
						handleChangeDate={ handleChangeDate }
						handleChangeTitle={ handleChangeTitle }
					/>
				</div>
				<GetAllVacations isDeleted={ deleted } />
			</div>

		</>
	)
}