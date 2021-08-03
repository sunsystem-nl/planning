import { Calendar } from 'primereact/calendar';
import moment from 'moment';

export const dateSelectField = (isUpdate, setDate, register, currentDate, invalidDates) => {
	const value = currentDate

	return <div className="form-row mt-3">
		<div className="form-group col-12">

			<label htmlFor="orderDate" style={{ width: '100%' }}>Datum</label>
			<Calendar
				id="orderDate"
				onChange={(e) => {
					let date = moment(e.value)
					setDate(date)
				}}
				showIcon
				name={'orderDate'}
				ref={register}
				showWeek
				style={{ width: '100%' }}
				value={value}
				readOnlyInput
				disabledDays={[0]}
				disabledDates={invalidDates}
			/>
		</div>
	</div>;
}
