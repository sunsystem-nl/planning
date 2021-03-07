import { Dropdown }    from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import React           from 'react'

export const Header = ( selectedColumns, columns, onColumnToggle, year, years, handleChangeYear ) => {
	return (
		<div
			className='d-flex flex-row justify-content-between align-items-center'
		>
			<MultiSelect
				value={ selectedColumns }
				options={ columns }
				optionLabel='header'
				onChange={ onColumnToggle }
				style={ { width: '20em' } }
			/>
			<div className='d-flex flex-row justify-content-between'>
				<Dropdown
					optionLabel='jaar'
					value={ year }
					options={ years }
					onChange={ handleChangeYear }
					placeholder='Selecteer een jaar'
				/>
			</div>
		</div>
	)
}