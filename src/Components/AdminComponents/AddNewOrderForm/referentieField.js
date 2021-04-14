export const referentie = (register) => {
	return <div className="form-row mt-3">
		<div className="form-group col-12">
			<label htmlFor="referentie">Referentie</label>
			<input type="text" className="form-control" id="referentie" placeholder="e.g. Janssen" ref={register} name={'referentie'} />
		</div>
	</div>
}