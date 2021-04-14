import { Editor } from 'primereact/editor';

const header = (
	<span className="ql-formats">
		<button className="ql-bold" aria-label="Bold"></button>
		<button className="ql-italic" aria-label="Italic"></button>
		<button className="ql-underline" aria-label="Underline"></button>
		<select className="ql-color" aria-label="Color"></select>
		<select className="ql-background" aria-label="background"></select>
	</span>
);

export const opmerkingField = (register, opmerking, setOpmerking) => {
	return <div className="form-row mt-3">
		<div className="form-group col-12">
			<label htmlFor="opmerking">Opmerking</label>
			<Editor style={{ height: '120px' }} value={opmerking} onTextChange={(e) => setOpmerking(e.htmlValue)} headerTemplate={header} ref={register} name={'opmerking'} id={'opmerking'} />
		</div>
	</div>
}