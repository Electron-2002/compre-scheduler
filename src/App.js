import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserHome from './Pages/UserHome';
import Exports from './Pages/Exports';
import { Login } from './Pages/Login';

const App = () => {
	let isLogin = sessionStorage.getItem('isLogin');
	if (!isLogin) return <Login />;

	return (
		<Switch>
			<Route path="/create/:scheduleId" exact component={Home} />
			<Route path="/exports" exact component={Exports} />
			<Route path="/" component={UserHome} />
		</Switch>
	);
};

export default App;
