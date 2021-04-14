import { Calendar } from 'primereact/calendar';

export const dateSelectField = (setDate, register, currentDate, invalidDates) => {
	return <div className="form-row mt-3">
		<div className="form-group col-12">

			<label htmlFor="orderDate" style={{ width: '100%' }}>Datum</label>
			<Calendar
				id="orderDate"
				onChange={(e) => setDate(e.value)}
				showIcon
				name={'orderDate'}
				ref={register}
				showWeek
				style={{ width: '100%' }}
				value={currentDate}
				disabledDays={[0]}
				disabledDates={invalidDates}
			/>
		</div>
	</div>;
}
