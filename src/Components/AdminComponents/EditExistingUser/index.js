import axios              from 'axios'
import { Messages }       from 'primereact/messages'
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
}                         from 'react'
import { NavLink }        from 'react-router-dom'
import { AuthContext }    from '../../../Context/AuthContext'
import { PageTitle }      from '../PageTitle'
import { AddNewUserForm } from '../UserForm'
import { validator }      from '../UserForm/validator'

export const EditExistingUser = ( data ) => {
	const { state } = data.history.location
	const message = useRef( null )
	const { token } = useContext( AuthContext )
	const [ users, setUsers ] = useState( [] )
	const [ searchTerm, setSearchTerm ] = React.useState( '' )
	const [ searchResults, setSearchResults ] = React.useState( [] )


	const handleUpdateUserSubmit = async( evt ) => {
		const { contactpersoon, email, wachtwoord, huisnummer, klantnummer, land, leverdag, naamKort, naamLang, plaats, postcode, role, straatnaam, telefoonMobiel, telefoonVast } = evt
		const errors = validator( email, wachtwoord, klantnummer, contactpersoon, naamKort, naamLang )

		if( errors.length > 1 ) {
			message.current.show( errors )
			return
		}

		const body = JSON.stringify( {
			                             'contactpersoon': contactpersoon,
			                             'email': email,
			                             'huisnummer': huisnummer,
			                             'klantnummer': klantnummer,
			                             'land': land,
			                             'leverdag': leverdag,
			                             'naamKort': naamKort,
			                             'naamLang': naamLang,
			                             'plaats': plaats,
			                             'postcode': postcode,
			                             'role': role,
			                             'straatnaam': straatnaam,
			                             'telefoonMobiel': telefoonMobiel,
			                             'telefoonVast': telefoonVast,
			                             'password': wachtwoord,
		                             } )

		const result = await axios.patch( `${ process.env.REACT_APP_API_URL }/users/${ state.uid }`, body, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${ token }`,
			},
		} )

		if( result.status === 400 || result.status === 500 ) {
			message.current.show( [
				                      {
					                      severity: 'error',
					                      detail: 'Er is iets fout gegaan met een gebruiker updaten, probeer nogmaals.',
				                      },
			                      ] )
		} else if( result.status === 200 ) {
			message.current.show( [
				                      {
					                      severity: 'success',
					                      detail: 'De gebruiker is succesvol geupdate in de database.',
				                      },
			                      ] )
		}
	}

	const fetchResults = useCallback( async() => {
		const result = await axios.get( `${ process.env.REACT_APP_API_URL }/users`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${ token }`,
			},
		} )
		if( result ) {
			setUsers( result.data.user )
		}
	}, [ token ] )

	const handleChange = ( evt ) => {
		setSearchTerm( evt.target.value )
	}

	useEffect( () => {
		const unsubscribe = fetchResults()

		setSearchResults( users )
		return unsubscribe
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchResults ] )

	useEffect( () => {
		const result = users.filter( user => {
			return user.naamKort.toLowerCase().includes( searchTerm )
		} )

		setSearchResults( result )
		return result
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ searchTerm, users ] )

	return (
		<div
			className={ 'd-flex flex-column p-5' }
			style={ { minHeight: 'calc(100vh - 59px)', height: '100%' } }
		>
			{ state === null ? (
				<div
					style={ {
						maxWidth: '900px',
						margin: '0',
						width: '100%',
					} }
				>
					<div className='form-row mt-3'>
						<div className='form-group col-md-6'>
							<h2 className={ 'text-warning' }>Selecteer aan
							                                 gebruiker.</h2>
						</div>
						<div className='form-group col-md-6'>
							<input
								type='text'
								placeholder='Search'
								value={ searchTerm }
								onChange={ handleChange }
								className='form-control'
							/>
						</div>
					</div>
					<ul
						className='list-group w-100 mt-3'
						style={ { width: '100%' } }
					>
						{ searchResults.map( ( user, i ) => {
							return (
								<li
									className='list-group-item d-flex flex-row justify-content-between p-3'
									key={ i }
								>
									<p className={ 'h5' }>{ user.naamKort }
									</p>
									<NavLink
										to={ {
											pathname: '/admin-dashboard/gebruikers/edit',
											state: user,
										} }
										className={ 'btn btn-warning' }
									>
										Edit</NavLink>
								</li>
							)
						} ) }
					</ul>
				</div>
			) : (
				  <div
					  style={ {
						  maxWidth: '900px',
						  margin: '0',
						  width: '100%',
					  } }
				  >
					  <PageTitle
						  title={ `Bewerk gegevens voor ${ state.naamKort }` }
					  />
					  <Messages ref={ message } id={ 'message' } />
					  <AddNewUserForm
						  handleSubmitForm={ handleUpdateUserSubmit }
						  data={ state }
					  />
				  </div>
			  ) }
		</div>
	)
}