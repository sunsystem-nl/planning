export const orderNummer = (register) => {
	return <div className="form-row mt-3">
		<div className="form-group col-12">
			<label htmlFor="ordernummer">Opdracht Nummer</label>
			<input type="number" className="form-control" id="ordernummer" placeholder="0" ref={register} name={'ordernummer'} />
		</div>
	</div>
}