import { MultiSelect } from 'primereact/multiselect'
import React           from 'react'

export const Header = ( selectedColumns, columns, onColumnToggle ) => (
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
	</div>
)