import { InputSwitch } from 'primereact/inputswitch';

export const urgentField = (register, urgent, seturgent) => {
	return (
		<div className="form-row mt-3">
			<div className="form-group col-12">
				<label htmlFor="urgent">{urgent ? 'Opdracht is dringend' : 'Opdracht is niet dringend'}</label>
				<InputSwitch checked={urgent} onChange={(e) => seturgent(e.value)} className='form-control' style={{ width: '50px', border: 'none', height: '25px' }} />
			</div>
		</div>
	)
}