import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserHome from './Pages/UserHome';
import Exports from './Pages/Exports';
import { Login } from './Pages/Login';

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={UserHome} />
			<Route path="/create" exact component={Home} />
			<Route path="/exports" exact component={Exports} />
			<Route path="/login" exact component={Login} />
		</Switch>
	);
};

export default App;
