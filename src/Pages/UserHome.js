import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Navigation from '../Components/Home/Navigation';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Redirect } from 'react-router-dom';
import './Home.css';
import backend from '../backend';
import Loading from '../Components/Loading/Loading';

const UserHome = () => {
	const userId = sessionStorage.getItem('userId');

	const [startDate, setStartDate] = useState(new Date());
	const [userSchedules, setUserSchedules] = useState([]);
	const [scheduleName, setScheduleName] = useState();
	const [endDate, setEndDate] = useState(new Date());
	const [redirect, setRedirect] = useState(false);

	const fetchUserSchedules = async () => {
		let response = await backend.post('/user/schedules', new URLSearchParams({ userId: userId }));
		setUserSchedules(response.data.sched);
	};

	useEffect(() => {
		fetchUserSchedules();
	}, []);

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
	};

	const handleNameChange = (e) => {
		setScheduleName(e.target.value);
	};
	const createNew = async (e) => {
		e.preventDefault();
		const scheduleData = {
			name: scheduleName,
			slots_each_day: 2,
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
		};
		await backend.post(`/schedule/create/${userId}`, new URLSearchParams(scheduleData));
		fetchUserSchedules();
		document.scheduleForm.reset();
	};

	return (
		<div>
			{redirect && (
				<Redirect
					to={{
						pathname: `/create/${redirect}`,
					}}
				/>
			)}
			<Navigation />
			<Grid container justify="space-around" className="main-container">
				{/* <Grid item xs={5}>
					<p>Will put some illustration here</p>
				</Grid> */}
				<Grid item xs={5}>
					<Grid item xs={12} container className="savedSchedule">
						{userSchedules.map((i, k) => (
							<Grid item className="mt-auto" key={k}>
								<Button
									className="savedScheduleButton"
									variant="contained"
									color="primary"
									onClick={() => setRedirect(i.id)}
								>
									{i.name}
								</Button>
							</Grid>
						))}
					</Grid>
					<Grid item xs={12} className="newScheduleForm">
						<h3>Create New Schedule</h3>
						<form name="scheduleForm" onSubmit={createNew}>
							<Grid container justify="space-around">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={11}>
										<TextField
											style={{ marginBottom: 16, width: '100%' }}
											label="Name of Schedule"
											required
											onChange={handleNameChange}
										/>
									</Grid>
									<Grid item xs={5}>
										<KeyboardDatePicker
											disableToolbar
											// variant="inline"
											disablePast
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Start Date"
											required
											value={startDate}
											onChange={handleStartDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid item xs={5}>
										<KeyboardDatePicker
											disableToolbar
											minDate={startDate}
											// variant="inline"
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="End Date"
											required
											value={endDate}
											onChange={handleEndDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid item xs={5}>
										<TextField
											disabled
											required
											style={{ marginTop: 16, width: '100%' }}
											type="number"
											value={2}
											InputProps={{ inputProps: { min: 1, max: 10 } }}
											label="No of Slots"
										/>
									</Grid>
									<Grid item xs={5} className="btn">
										<Button variant="contained" color="primary" type="submit">
											Create New Schedule
										</Button>
									</Grid>
								</MuiPickersUtilsProvider>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};
export default UserHome;
