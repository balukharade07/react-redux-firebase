import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<AppNavBar />
					<div className="container">
						<Switch path="/">
							<Route
								exact
								path="/"
								component={UserIsAuthenticated(Dashboard)}
							/>
							<Switch path="/Dashboard">
								<Route
									exact
									path="/Dashboard"
									component={UserIsAuthenticated(Dashboard)}
								/>
								<Redirect
									push
									to="/Dashboard"
									path="*"
									exact={true}
									component={UserIsAuthenticated(Dashboard)}
								/>
							</Switch>
							<Route
								exact
								path="/login"
								component={UserIsNotAuthenticated(Login)}
							/>
							<Route
								exact
								path="/client/add"
								component={UserIsAuthenticated(AddClient)}
							/>
							<Route
								exact
								path="/client/edit/:id"
								component={UserIsAuthenticated(EditClient)}
							/>
							<Route
								exact
								path="/client/:id"
								component={UserIsAuthenticated(ClientDetails)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
