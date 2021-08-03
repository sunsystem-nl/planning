const orderUsers = users => (
	users.sort((a, b) => a.naamKort.localeCompare(b.naamKort))
)

export const klantSelectField = (selectedUser, setSelectedUser, register, users) => {
	return <div className='form-row mt-3'>
		<div className='form-group col-12'>
			<label htmlFor='klant'>Klant</label>
			<select
				className="form-control w-100"
				id="klantID"
				name={'klantID'}
				ref={register}
				onChange={e => setSelectedUser(e.target.value)}
			>
				{users && orderUsers(users).map((user, index) => <option key={index} value={user.uid} selected={selectedUser && selectedUser === user.uid}>{user.naamKort}</option>)}
			</select>
		</div>
	</div>
}
