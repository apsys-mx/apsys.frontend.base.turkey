import React, { useState } from 'react'
import PropTypes from 'prop-types'

/** Material UI import section */
import { IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import * as classes from './search-box.styles'
const SearchBox = (props) => {
	const {
		/** Destructuring properties */
		placeholder,
		autoFocus,
		autoSearch,
		/** Destructuring callbacks */
		onChange,
	} = props

	/** Define local state */
	const [searchValue, setSearchValue] = useState('')

	const onChangeHandler = (event) => {
		const query = event.target.value
		setSearchValue(query)
		if (autoSearch && onChange) {
			onChange(query)
		}
	}

	const onKeyDown = (event) => {
		if (event.key === 'Enter') {
			if (onChange) {
				onChange(searchValue)
			}
		}
		if (event.key === 'Escape') {
			setSearchValue(null)
			if (onChange) {
				onChange(null)
			}
		}
	}

	const onSearchButtonClick = () => {
		if (onChange) {
			onChange(searchValue)
		}
	}

	return (
		<div className={classes.inputHolder}>
			<InputBase
				autoFocus={autoFocus}
				className={classes.input}
				placeholder={placeholder}
				inputProps={{ 'aria-label': `${placeholder}` }}
				value={searchValue || ''}
				onChange={onChangeHandler}
				onKeyDown={onKeyDown}
			/>
			<IconButton
				aria-label='search'
				size='small'
				className={classes.iconButton}
				onClick={onSearchButtonClick}
			>
				<Search fontSize='inherit' />
			</IconButton>
		</div>
	)
}

SearchBox.propTypes = {
	placeholder: PropTypes.string,
	autoSearch: PropTypes.bool,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}

SearchBox.defaultProps = {
	placeholder: '',
	autoSearch: false,
	autoFocus: false,
	onChange: () => console.warn('onChange callback not defined!'),
}

export default SearchBox
