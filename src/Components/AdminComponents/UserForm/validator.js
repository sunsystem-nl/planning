export const validator = ( email, wachtwoord, klantnummer, contactpersoon, naamKort, naamLang ) => {
	let errors = []

	if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email ) ) {
		errors.push(
			{
				severity: 'error',
				detail: 'Het gebruikte email is incorrect.',
				sticky: false,
				life: 10000,
			} )
	}

	if( !wachtwoord || !wachtwoord === '' ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het wachtwoord veld is leeg.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	if( wachtwoord.length < 6 ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het wachtwoord is to kort, meer dan 6 cijfers of letters is vereist.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	if( !klantnummer || klantnummer === '' ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het klantnummer veld is leeg.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	if( !contactpersoon || contactpersoon === '' ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het Contactpersoon veld is leeg.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	if( !naamKort || naamKort === '' ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het veld Naam Kort is leeg.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	if( !naamLang || naamLang === '' ) {
		errors.push( {
			             severity: 'error',
			             detail: 'Het veld Naam lang is leeg.',
			             sticky: false,
			             life: 10000,
		             } )
	}

	return errors
}