import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions/tableActions';
import Grid from '@material-ui/core/Grid';
import Navigation from '../Components/Home/Navigation';
import Table from '../Components/Home/Table';
import Sidebar from '../Components/Home/Sidebar';
import Loading from '../Components/Loading/Loading';

const Home = (props) => {
	const scheduleId = props.match?.params?.scheduleId;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchData(scheduleId));
	}, [dispatch]);

	const isLoading = useSelector((state) => state.load.isLoading);

	return (
		<div>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Navigation showSave showExport />
					<Grid container>
						<Grid item xs={2} className="sidebar-container">
							<Sidebar />
						</Grid>
						<Grid item xs={10}>
							<Table />
						</Grid>
					</Grid>
				</>
			)}
		</div>
	);
};

export default Home;
