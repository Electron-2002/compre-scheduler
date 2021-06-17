import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/tableActions';
import Grid from '@material-ui/core/Grid';
import Navigation from '../Components/Home/Navigation';
import Table from '../Components/Home/Table';
import Sidebar from '../Components/Home/Sidebar';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<div>
			<Navigation showSave showExport />
			<Grid container>
				<Grid item xs={2} className="sidebar-container">
					<Sidebar />
				</Grid>
				<Grid item xs={10}>
					<Table />
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
