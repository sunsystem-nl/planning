export const productAantal = (register, setAantal) => {
	return <div className="form-row mt-3">
		<div className="form-group col-12">
			<label htmlFor="productAantal">Aantal</label>
			<input type="number" className="form-control" id="productAantal" placeholder="0" ref={register} name={'productAantal'} onChange={(e) => setAantal(e.target.value)} />
		</div>
	</div>
}