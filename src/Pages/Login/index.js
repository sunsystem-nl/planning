import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
}                     from 'react'
import { withRouter } from 'react-router'

import Container       from 'react-bootstrap/Container'
import Row             from 'react-bootstrap/Row'
import Form            from 'react-bootstrap/Form'
import Button          from 'react-bootstrap/Button'
import { AuthContext } from '../../Context/AuthContext'

const LoginPage = ( { history } ) => {
	const emailRef = useRef()
	const passwordRef = useRef()
	// eslint-disable-next-line
	const [ loading, setLoading ] = useState( false )

	const { currentUser, login, role } = useContext( AuthContext )

	const handleSubmit = useCallback( async evt => {
		evt.preventDefault()

		try {
			setLoading( true )
			await login( emailRef.current.value, passwordRef.current.value )
		} catch( err ) {
			console.log( err )
		} finally {
			setLoading( false )
		}
	}, [ login ] )

	useEffect( () => {
		if( currentUser ) {
			if( role.admin ) {
				history.push( '/admin-dashboard' )
			} else if( role.klant ) {
				history.push( '/client-dashboard' )
			} else if( role.werknemer ) {
				history.push( '/workshop-dashboard' )
			}
		}
	}, [ currentUser, role, history ] )

	return (
		<Container style={ { height: '100vh' } }>
			<Row
				className={ 'flex flex-column justify-content-center align-items-center' }
				style={ { maxHeight: '100vh', height: '100%' } }
			>
				<div style={ { maxWidth: '600px' } } className={ 'w-100' }>
					{ !currentUser && (
						<>
							<h1>SunSystem</h1>
							<p>Welkom bij SunSystem Geleen. Bent u klant van ons
							   en heeft u nog geen login gegevens neem dan
							   contact met ons op.
							</p>
							<div className='card'>
								<div className='card-body'>
									<Form onSubmit={ handleSubmit }>
										<Form.Group
											controlId='formBasicEmail'
										>
											<Form.Label>
												Email
											</Form.Label>
											<Form.Control
												type='email'
												placeholder='Voer uw email in'
												ref={ emailRef }
											/>
										</Form.Group>

										<Form.Group
											controlId='formBasicPassword'
										>
											<Form.Label>
												Wachtwoord
											</Form.Label>
											<Form.Control
												type='password'
												placeholder='Voer uw wachtwoord in'
												ref={ passwordRef }
											/>
										</Form.Group>

										<Button
											variant='warning'
											type='submit'
										>
											Login
										</Button>
									</Form>
								</div>
							</div>
						</>
					) }
				</div>
			</Row>
		</Container>
	)
}

export default withRouter( LoginPage )