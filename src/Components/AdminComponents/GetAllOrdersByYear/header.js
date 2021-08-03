import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import { Dropdown } from 'primereact/dropdown';

export const Header = (selectedColumns, columns, onColumnToggle, years, selectedYear, setSelectedYear) => {

	const yearSelectItems = []

	years.forEach(year => {
		yearSelectItems.push({ label: year.year, value: year.id })
	});

	return (
		<div
			className='d-flex flex-row justify-content-between align-items-center'
		>
			<MultiSelect
				value={selectedColumns}
				options={columns}
				optionLabel='header'
				onChange={onColumnToggle}
				style={{ width: '20em' }}
			/>
			<Dropdown value={selectedYear} options={yearSelectItems} onChange={(e) => setSelectedYear(e.value)} placeholder="Selecteer een jaar" />
		</div>
	)
}