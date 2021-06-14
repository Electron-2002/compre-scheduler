import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';

const App = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
		</Switch>
	);
};

export default App;
