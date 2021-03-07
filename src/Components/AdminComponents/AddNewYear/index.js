import axios           from 'axios'
import { Messages }    from 'primereact/messages'
import React, {
	useContext,
	useRef,
	useState,
}                      from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { GetAllYears } from '../GetAllYears'
import { PageTitle }   from '../PageTitle'
import { AddYearForm } from '../YearForm'

export const AddNewYear = () => {
	const { token } = useContext( AuthContext )
	const message = useRef( null )

	const [ deleted, setDeleted ] = useState( null )
	const [ year, setYear ] = useState( '' )

	const handleChangeYear = ( evt ) => setYear( evt.target.value )

	const submitForm = async( evt ) => {
		evt.preventDefault()
		setDeleted( false )
		const body = JSON.stringify( {
			                             id: parseInt( year ),
			                             year: parseInt( year ),
		                             } )

		try {
			const response = await axios.post( `${ process.env.REACT_APP_API_URL }/years`, body, {
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
					                      detail: 'Dit jaar staat al in de database.',
				                      },
			                      ] )
			setDeleted( false )
		}
	}

	return (
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
				<PageTitle title={ 'Voeg een nieuw jaar toe.' } />
				<Messages ref={ message } id={ 'message' } />
				<AddYearForm
					submitForm={ submitForm }
					handleChangeYear={ handleChangeYear }
				/>
			</div>
			<GetAllYears isDeleted={ deleted } />
		</div>
	)
}