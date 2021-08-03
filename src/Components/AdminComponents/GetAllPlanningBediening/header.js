import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import { Dropdown } from 'primereact/dropdown';

export const Header = (selectedColumns, columns, onColumnToggle, years, selectedYear, setSelectedYear, weeks, setSelectedWeek, selectedWeek) => {

	const yearSelectItems = []

	years.forEach(year => {
		yearSelectItems.push({ label: year.year, value: year.id })
	});

	const weekSelectItems = []

	weeks.forEach(week => {
		weekSelectItems.push({ label: week.id, value: week.value })
	})

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
			<div className='d-flex flex-row justify-content-end align-items-center'>
				<Dropdown value={selectedWeek} options={weekSelectItems} onChange={(e) => setSelectedWeek(e.value)} placeholder="Selecteer een week" className='mr-5' />
				<Dropdown value={selectedYear} options={yearSelectItems} onChange={(e) => setSelectedYear(e.value)} placeholder="Selecteer een jaar" />
			</div>
		</div>
	)
}