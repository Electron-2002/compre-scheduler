import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserHome from './Pages/UserHome';

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={UserHome} />
			<Route path="/create" exact component={Home} />
		</Switch>
	);
};

export default App;
