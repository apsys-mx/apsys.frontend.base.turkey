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

-   Create a file `features/home/home.slice.js` with the code show below

```javascript
// home.slice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}
export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {},
})
export default homeSlice.reducer
```

-   Modify the file `store/store.js` as show below in order to add the application slice in the store

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import homeSlice from '../features/home/home.slice'

const rootReducer = combineReducers({
	homeSlice: homeSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
```

### Add selectors and actions

-   Create a file `features/home/home.selectors.js` with the code show below

```javascript
import { createSelector } from 'reselect'

const getState = (state) => (state = state.homeSlice)

const getTitle = createSelector(getState, (state) => {
	return state.title
})

export { getTitle }
```

-   Modify the file `features/home/home.slice.js` as show below

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Hello world',
}

export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
	},
})

export const { setTitle } = homeSlice.actions
export default homeSlice.reducer
```

-   Modify the file `app.jsx` as show below in order to use the selector and actions defined

```jsx
// app.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from './features/home/home.selectors'
import { setTitle } from './features/home/home.slice'

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

## Create environment files

-   Create three environment files: `.env` for development environment, `.env.qas` for qas environment, and `.env.prd` for production environment.
-   In the three files add the next line

```text
VITE_APP_ROOT='/'
```

## Configure routing

-   Install routing library `npm install react-router-dom`
-   Create the files `features/landing/landing.jsx` and `features/landing/landing.template.jsx` for a landing page used for not authenticated users

```jsx
// landing.jsx
import React from 'react'
import DesktopTemplate from './landing.template'

const Landing = () => {
	return <DesktopTemplate />
}
export default Landing
```

```jsx
// landing.template.jsx
import React from 'react'

const LandingTemplate = () => {
	return <h1>Landing page template</h1>
}
export default LandingTemplate
```

-   Create the files `features/home/index/home.jsx` and `features/home/index/home.template.jsx` for a home page used for authenticated users

```jsx
// home.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitle } from '../home.selectors'
import { setTitle } from '../home.slice'

import DesktopTemplate from './home.template'

const Home = () => {
	var dispatch = useDispatch()
	const title = useSelector((state) => getTitle(state))

	const onchangeTitle = (event) => dispatch(setTitle(event.target.value))

	return <DesktopTemplate title={title} onchangeTitle={onchangeTitle} />
}

export default Home
```

```jsx
// home.template.jsx
import React from 'react'

const HomeTemplate = ({ title, onchangeTitle }) => {
	return (
		<div>
			<h1>Home page</h1>
			<h2>{title}</h2>
			<input onChange={onchangeTitle} />
		</div>
	)
}
export default HomeTemplate
```

-   Modify `main.jsx` in order to define the routes for a landing page

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import RootView from './root-view'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './features/landing/landing'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RootView>
			<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
				<Routes>
					<Route path='/*' element={<App />} />
					<Route path='login' element={<Landing />} />
				</Routes>
			</BrowserRouter>
		</RootView>
	</React.StrictMode>
)
```

-   Modify `app.jsx` in order to define the routes for a home page

```jsx
// app.jsx file
import React from 'react'
import Home from './features/home/index/home'
import { Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
		</Routes>
	)
}

export default App
```

## Configure IdentityServer4

-   Install oidc libraries running `npm install oidc-client` and `npm install redux-oidc`
-   Modify the environment files as show below

```javascript
// .env file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'http://localhost:57065/'
```

```javascript
// .env.qas file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'http://10.7.93.233:8020/uat4.0/'
```

```javascript
// .env.prd file
VITE_APP_ROOT = '/'
VITE_APP_CLIENT_ID = 'apsys.frontend.base'
VITE_IDENTITY_SERVER_URL = 'https://identity.efemsa.com/v4.0/'
```

### Create the user-manager file

-   Create the file `auth/user-manager.js`

```javascript
// user-manager.js file
import { createUserManager } from 'redux-oidc'
import { getAbsoluteUrlAddress } from '../helpers/url-helper'

const userManagerConfig = {
	authority: `${import.meta.env.VITE_IDENTITY_SERVER_URL}`,
	client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
	redirect_uri: getAbsoluteUrlAddress('callback'),
	post_logout_redirect_uri: getAbsoluteUrlAddress(''),
	response_type: 'id_token token',
	scope: 'openid profile userprofile',
	filterProtocolClaims: true,
	loadUserInfo: true,
}

const userManager = createUserManager(userManagerConfig)
export default userManager
```

-- Modify the `store/store.js` file

```javascript
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import homeSlice from '../features/home/home.slice'

import { reducer as oidcReducer } from 'redux-oidc'
import createOidcMiddleware from 'redux-oidc'
import userManager from '../auth/user-manager'

const oidcMiddleware = createOidcMiddleware(userManager)

const rootReducer = combineReducers({
	homeSlice: homeSlice,
	oidc: oidcReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(oidcMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
})
```

-   Modify the `root-view.jsx` file

```javascript
// root-view.jsx file
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { OidcProvider, loadUser } from 'redux-oidc'
import userManager from './auth/user-manager'

loadUser(store, userManager)

const RootView = (props) => {
	return (
		<OidcProvider store={store} userManager={userManager}>
			<Provider store={store}>{props.children}</Provider>
		</OidcProvider>
	)
}
export default RootView
```
