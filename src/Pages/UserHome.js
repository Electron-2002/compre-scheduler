import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Navigation from '../Components/Home/Navigation';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import './Home.css';

const UserHome = () => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const history = useHistory();

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
	};

	const createNew = () => {
		history.push('create');
	};

	return (
		<div>
			<Navigation />
			<Grid container justify="space-around" className="main-container">
				<Grid item xs={5}>
					<p>Will put some illustration here</p>
				</Grid>
				<Grid item xs={5}>
					<Grid item xs={12} container className="savedSchedule">
						{['Saved 1', 'Schedule 2', 'schedule 3'].map((i, k) => (
							<Grid item className="mt-auto">
								<Button className="savedScheduleButton" variant="contained" color="primary">
									{i}
								</Button>
							</Grid>
						))}
					</Grid>
					<Grid item xs={12} className="newScheduleForm">
						<h3>Create New Schedule</h3>
						<form>
							<Grid container justify="space-around">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={5}>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Start Date"
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
											variant="inline"
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="End Date"
											value={endDate}
											onChange={handleEndDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid item xs={5}>
										<TextField
											style={{ marginTop: 16, width: '100%' }}
											type="number"
											InputProps={{ inputProps: { min: 1, max: 10 } }}
											label="No of Slots"
										/>
									</Grid>
									<Grid item xs={5} className="mt-auto">
										<Button variant="contained" color="primary" onClick={createNew}>
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
