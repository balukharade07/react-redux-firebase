import React from 'react';
import {
  BrowserRouter as Router,Route,Switch
} from "react-router-dom";
import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';
import {Provider} from 'react-redux';
import store from './store';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <AppNavBar />
        <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard}></Route>
              <Route exact path="/Dashboard" component={Dashboard}></Route>
              <Route exact path="/client/add" component={AddClient}></Route>
              <Route exact path="/client/:id" component={ClientDetails}></Route>
            </Switch>
        </div>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
