import axios                                   from 'axios'
import { Messages }                            from 'primereact/messages'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext }                         from '../../../Context/AuthContext'
import { GetAllProducts }                      from '../GetAllProducts'
import { PageTitle }                           from '../PageTitle'
import { AddProductForm }                      from '../ProductForm'

/**
 * @description This component adds a new product to the database
 * @returns {JSX.Element}
 * @constructor
 */
export const AddNewProduct = () => {
	/**
	 * @description get the bearer token
	 */
	const { token } = useContext( AuthContext )

	/**
	 * @description The message that is displayed in case of an error or
	 *     successful operation
	 * @type {React.MutableRefObject<null>}
	 */
	const message = useRef( null )

	/**
	 * @description components initial states
	 */
	const [ deleted, setDeleted ] = useState( null )
	const [ plural, setPlural ] = useState( '' )
	const [ singular, setSingular ] = useState( '' )

	/**
	 * @description update the plural state on user input
	 * @param evt
	 */
	const handleChangePlural = ( evt ) => setPlural( evt.target.value )

	/**
	 * @description update the singular state on user input
	 * @param evt
	 */
	const handleChangeSingular = ( evt ) => setSingular( evt.target.value )

	/**
	 * @description post the new product to the database
	 * @param evt
	 * @returns {Promise<void>}
	 */
	const submitForm = async( evt ) => {
		evt.preventDefault()
		setDeleted( false )

		/**
		 * @description create the body to post to the database
		 * @type {string}
		 */
		const body = JSON.stringify( {
			                             productNaamSingular: singular,
			                             productNaamPlural: plural,
		                             } )

		try {
			/**
			 * @description post to api and wait for the response
			 * @type {AxiosResponse<any>}
			 */
			const response = await axios.post( `${ process.env.REACT_APP_API_URL }/products`, body, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Bearer ${ token }`,
				},
			} )

			/**
			 * @description if the response is OK show message to user
			 * @TODO: create a global success component
			 */
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
			/**
			 * @description if there is any error show user a message
			 * @TODO: create a global error component
			 */
			message.current.show( [
				                      {
					                      severity: 'error',
					                      detail: 'Dit Product staat al in de database.',
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
				<PageTitle title={ 'Voeg een nieuw product toe.' } />
				<Messages ref={ message } id={ 'message' } />
				<AddProductForm
					submitForm={ submitForm }
					handleChangePlural={ handleChangePlural }
					handleChangeSingular={ handleChangeSingular }
				/>
			</div>
			<GetAllProducts isDeleted={ deleted } />
		</div>
	)
}