// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const timesheetsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://localhost:7155/',
	}),
	tagTypes: [],
	reducerPath: ['timesheetsApi'],
	endpoints: () => ({}),
})
