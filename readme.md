## Install vitejs

-   Clone the repository with `https://github.com/apsys-mx/apsys.frontend.base.turkey.git`
-   Change to `apsys.frontend.base.turkey`
-   Run the command `npm create vite@latest .`
-   Run the command `npm install`
-   Run the command `npm run dev`

Check that the project is running correctly

## Install and configure redux store with redux-toolkit

### Set initial files structure

-   Delete files `App.css` and `index.css`
-   Rename files `App.jsx` to `app.jsx`
-   Change the `main.jsx` content as show below

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
```

-   Change the `app.jsx` content as show below

```jsx
import React from 'react'

const App = () => {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	)
}

export default App
```

### Configure the redux store

-   Install redux `npm install react-redux` and redux-toolkit `npm install @reduxjs/toolkit`
-   Create a file `store/store,js` with the code show below

```javascript
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
```

-   Create a file `root-view.jsx` with the code show below

```jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

const RootView = (props) => {
	return <Provider store={store}>{props.children}</Provider>
}
export default RootView
```

-   Modify the `main.jsx` as show below in order to inject the store in the root of the application

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<App />
		</RootView>
	</React.StrictMode>
)
```

### Add an application slice

-   Create a file `features/application/application.slice.js` with the code show below

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}
export const applicationSlice = createSlice({
	name: 'applicationSlice',
	initialState,
	reducers: {},
})
export default applicationSlice.reducer
```

-   Modify the file `store/store.js` as show below in order to add the application slice in the store

```javascript
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import applicationSlice from '../features/application/application.slice'

const rootReducer = combineReducers({
	applicationSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
```

### Add selectors and actions

-   Create a file `features/application/application.selectors.js` with the code show below

```javascript
import { createSelector } from 'reselect'

const getState = (state) => (state = state.applicationSlice)

const getTitle = createSelector(getState, (state) => {
	return state.title
})

export { getTitle }
```

-   Modify the file `features/application/application.slice.js` as show below

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}

export const applicationSlice = createSlice({
	name: 'applicationSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
	},
})

export const { setTitle } = applicationSlice.actions
export default applicationSlice.reducer
```

-   Modify the file `app.jsx` as show below in order to use the selector and actions defined

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from './features/application/application.selectors'
import { setTitle } from './features/application/application.slice'

/**
 * App component
 */
const App = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))

	return (
		<div>
			<h1>{title}</h1>
			<input onChange={onchangeTitle} />
		</div>
	)
}

export default App
```
