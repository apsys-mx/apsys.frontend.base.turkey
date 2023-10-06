import React from 'react'
import { Box } from '@mui/material'
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'
// import Pagination from '../../common/datagrid/pagination'
import * as styles from './home.styles'
import SearchComponent from '../../common/search/search-component'

/**
 * Home component
 */
const HomeTemplate = ({
	response,
	onChangePage,
	handleChangeRowsPerPage,
	onchangeSorting,
	sorting,
}) => {
	return (
		<Box>
			<Box sx={styles.searchContainer}>
				<SearchComponent
					placeholder={''}
					value={''}
					onChange={console.warn('No [onChangeValue] callback defined')}
				/>
			</Box>
			<TimesheetsTable
				tableConfig={defaultTableConfigurationTimeSheets}
				{...response}
				onchangeSorting={onchangeSorting}
				sortBy={
					sorting.sortBy && sorting.sortBy.length > 0 ? sorting.sortBy : 'projectName'
				}
				sortDirection={
					sorting.sortDirection && sorting.sortDirection.length > 0
						? sorting.sortDirection
						: 'desc'
				}
			/>
			{/* <Pagination
				pagination={response}
				onPageChange={onChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Box>
	)
}

export default HomeTemplate
