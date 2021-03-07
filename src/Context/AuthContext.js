import React, { createContext, useEffect, useRef, useState } from 'react'
import { auth }                                              from '../Helpers/firebase'
import firebase
                                                             from 'firebase/app'

export const AuthContext = createContext()

export const AuthProvider = ( { children } ) => {
	const [ currentUser, setCurrentUser ] = useState( null )
	const [ token, setToken ] = useState( null )
	const [ role, setRole ] = useState( {} )
	const [ count, setCount ] = useState( 0 )
	const savedCallback = useRef()

	function callback() {
		setCount( count + 1 )
	}

	useEffect( () => {
		savedCallback.current = callback
	} )

	useEffect( () => {
		function tick() {
			savedCallback.current()
		}

		let id = setInterval( tick, 1000 * 60 * 29 )
		return () => clearInterval( id )
	}, [] )

	// log the user in with email and password
	const login = ( email, password ) => {
		firebase.auth().setPersistence( firebase.auth.Auth.Persistence.LOCAL ).then( () => {
			return auth.signInWithEmailAndPassword( email, password )
		} ).catch( err => console.error( err ) )
	}

	// log the user out from the application
	// set all states to their original state
	const logout = () => {
		setCurrentUser( null )
		setToken( null )
		setRole( {} )
		return auth.signOut()
	}

	useEffect( () => {
		const listener = auth.onAuthStateChanged( user => {
			// set the current user
			setCurrentUser( user )

			if( !currentUser ) return

			// get the id token of that user which needs to be send to the
			// server on every request
			auth.currentUser.getIdToken( /* forceRefresh */ true ).then( idToken => {
				setToken( idToken )
			} ).catch( err => console.error( err ) )

			// see what claims the token holds this is used to change ui views
			// based on claims
			auth.currentUser.getIdTokenResult().then( idTokenResult => {
				if( idTokenResult.claims.role === 'admin' ) {
					setRole( { admin: true } )
				}

				if( idTokenResult.claims.role === 'werknemer' ) {
					setRole( { werknemer: true } )
				}

				if( idTokenResult.claims.role === 'klant' ) {
					setRole( { klant: true } )
				}
			} )

		} )
		return listener
	}, [ currentUser, count ] )

	// create an object for the auth context provider
	const value = {
		currentUser,
		token,
		role,
		login,
		logout,
	}

	// return the auth context wrapper
	return (
		<AuthContext.Provider value={ value }>
			{ children }
		</AuthContext.Provider>
	)
}