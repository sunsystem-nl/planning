import React from 'react'
import { useForm } from 'react-hook-form'

export const AddNewUserForm = ({ handleSubmitForm, data }) => {
	const { register, handleSubmit } = useForm({
		defaultValues: data === 'undefined' ? '' : data,
	})

	return (
		<form
			onSubmit={handleSubmit(handleSubmitForm)}
			className={'mx-auto w-100'}
		>
			<div className='form-row mt-3'>
				<div className='form-group col-md-6'>
					<label htmlFor='email'>Email</label>
					<input
						type='email' className='form-control'
						id='email' placeholder='Email'
						ref={register}
						name={'email'}
					/>
				</div>
				{data === undefined ? (
					<div className='form-group col-md-6'>
						<label htmlFor='wachtwoord'>Wachtwoord</label>
						<input
							type='password' className='form-control'
							id='wachtwoord' placeholder='Wachtwoord'
							ref={register}
							name={'wachtwoord'}
						/>
					</div>
				) : <></>}
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-8'>
					<label htmlFor='straatnaam'>Straat Naam</label>
					<input
						type='text' className='form-control'
						id='straatnaam'
						placeholder='Kampstraat'
						ref={register}
						name={'straatnaam'}
					/>
				</div>
				<div className='form-group col-md-4'>
					<label htmlFor='huisnummer'>Huisnummer</label>
					<input
						type='text' className='form-control'
						id='huisnummer'
						placeholder='2f'
						ref={register}
						name={'huisnummer'}
					/>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-4'>
					<label htmlFor='plaats'>Plaats</label>
					<input
						type='text'
						className='form-control'
						id='plaats'
						placeholder={'Geleen'}
						ref={register}
						name={'plaats'}
					/>
				</div>
				<div className='form-group col-md-4'>
					<label htmlFor='postcode'>Postcode</label>
					<input
						type='text'
						className='form-control'
						id='postcode'
						placeholder={'6163HG'}
						ref={register}
						name={'postcode'}
					/>
				</div>
				<div className='form-group col-md-4'>
					<label htmlFor='land'>Land</label>
					<input
						type='text'
						className={'form-control'}
						id={'land'}
						placeholder={'Nederland'}
						ref={register}
						name={'land'}
					/>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-6'>
					<label htmlFor='naamKort'>Bedrijfs Naam Kort</label>
					<input
						type='text'
						className={'form-control'}
						id={'naamKort'}
						placeholder={'Bedrijfs naam kort'}
						ref={register}
						name={'naamKort'}
					/>
				</div>
				<div className='form-group col-md-6'>
					<label htmlFor='naamLang'>Bedrijfs Naam Lang</label>
					<input
						type='text'
						className={'form-control'}
						id={'naamLang'}
						placeholder={'Bedrijfs naam lang'}
						ref={register}
						name={'naamLang'}
					/>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-6'>
					<label htmlFor='contactpersoon'>Contact Persoon</label>
					<input
						type='text'
						className={'form-control'}
						id={'contactpersoon'}
						placeholder={'Contact persoon'}
						ref={register}
						name={'contactpersoon'}
					/>
				</div>
				<div className='form-group col-md-6'>
					<label htmlFor='klantnummer'>Klant Nummer</label>
					<input
						type='number'
						className={'form-control'}
						id={'klantnummer'}
						placeholder={'Klant nummer'}
						ref={register}
						name={'klantnummer'}
					/>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-6'>
					<label htmlFor='telefoonMobiel'>Telefoon Mobiel</label>
					<input
						type='tel'
						ref={register}
						className={'form-control'}
						id={'telefoonMobiel'}
						placeholder={'Telefoon mobiel'}
						name={'telefoonMobiel'}
					/>
				</div>
				<div className='form-group col-md-6'>
					<label htmlFor='telefoonVast'>Telefoon Vast</label>
					<input
						type='tel'
						ref={register}
						className={'form-control'}
						id={'telefoonVast'}
						placeholder={'Telefoon vast'}
						name={'telefoonVast'}
					/>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='form-group col-md-4'>
					<label htmlFor='role'>Rol</label>
					<select
						className='form-control'
						id='role'
						defaultValue={'klant'}
						ref={register}
						name={'role'}
					>
						<option value={'klant'}>Klant</option>
						<option value={'werknemer'}>Werknemer</option>
						<option value={'admin'}>Admin</option>
					</select>
				</div>
				<div className='col-md-4 form-group'>
					<label htmlFor='leverdag'>Leverdag</label>
					<select
						className='form-control'
						id='leverdag'
						defaultValue={'geen'}
						ref={register}
						name={'leverdag'}
					>
						<option value={'geen'}>Geen</option>
						<option value={'maandag'}>Maandag</option>
						<option value={'dinsdag'}>Dinsdag</option>
						<option value={'woensdag'}>Woensdag</option>
						<option value={'donderdag'}>Donderdag</option>
						<option value={'vrijdag'}>Vrijdag</option>
						<option value={'zaterdag'}>Zaterdag</option>
						<option value={'zondag'}>Zondag</option>
					</select>
				</div>
				<div className='col-md-4 form-group'>
					<label htmlFor='wilemail'>Email wanneer gereed</label>
					<select
						className='form-control'
						id='wilemail'
						defaultValue={'false'}
						ref={register}
						name={'wilemail'}
					>
						<option value={true}>Ja</option>
						<option value={false}>Nee</option>
					</select>
				</div>
			</div>
			<div className='form-row mt-3'>
				<div className='col-12'>
					<button type='submit' className='btn btn-warning'>
						{data ? 'Update gebruiker' : 'Maak Nieuwe Gebruiker'}
					</button>
				</div>
			</div>
		</form>
	)
}