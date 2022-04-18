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
import { Chip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const UserHome = () => {
	const userId = sessionStorage.getItem('userId');

	const [startDate, setStartDate] = useState(new Date());
	const [userSchedules, setUserSchedules] = useState([]);
	const [scheduleName, setScheduleName] = useState();
	const [endDate, setEndDate] = useState(new Date());
	const [redirect, setRedirect] = useState(false);
	const [slots, setSlots] = useState([]);
	const [tempSlot, setTempSlot] = useState('');

	const fetchUserSchedules = async () => {
		let response = await backend.post('/user/schedules', new URLSearchParams({ userId: userId }));
		setUserSchedules(response.data.sched);
	};

	const deleteUserSchedule = async (scheduleId) => {
		if (window.confirm('Are you sure you want to delete this schedule?')) {
			await backend.delete(`/schedule/${scheduleId}`);

			fetchUserSchedules();
		}
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

		if (endDate < startDate) return;

		const scheduleData = {
			name: scheduleName,
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
			slots,
		};
		await backend.post(`/schedule/create/${userId}`, scheduleData);
		fetchUserSchedules();
		document.scheduleForm.reset();
		setSlots([]);
		setTempSlot('');
	};

	const addSlotHandler = () => {
		setSlots((prev) => [...prev, tempSlot]);
		setTempSlot('');
	};

	const deleteSlotHandler = (text) => {
		setSlots((prev) => prev.filter((s) => s !== text));
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
				<Grid item xs={5}>
					<Grid item xs={12} container className="savedSchedule">
						{userSchedules.map((i, k) => (
							<Grid item className="mt-auto scheduleContainer" key={k}>
								<Button
									className="savedScheduleButton"
									variant="contained"
									color="primary"
									onClick={() => setRedirect(i.id)}
								>
									{i.name}
								</Button>
								<IconButton
									style={{ marginLeft: '-10px' }}
									size="small"
									onClick={() => deleteUserSchedule(i.id)}
								>
									<DeleteIcon />
								</IconButton>
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
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="End Date"
											required
											value={endDate}
											onChange={handleEndDateChange}
											minDateMessage="Date should not be before start date"
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid item xs={5}>
										<TextField
											style={{ marginTop: 16, width: '100%' }}
											value={tempSlot}
											onChange={(e) => setTempSlot(e.target.value)}
											label="Slot (Eg. 9-10:30)"
										/>
									</Grid>
									<Grid item xs={5} className="btn">
										<Button
											variant="contained"
											color="primary"
											onClick={addSlotHandler}
											style={{ width: '100%' }}
										>
											Add Slot
										</Button>
									</Grid>
									<Grid container xs={10} style={{ marginTop: 16 }}>
										{slots.map((slot) => (
											<Grid item key={slot}>
												<Chip
													variant="outlined"
													label={`${slot} X`}
													size="medium"
													style={{ cursor: 'pointer' }}
													onClick={() => deleteSlotHandler(slot)}
												/>
											</Grid>
										))}
									</Grid>

									<Grid item xs={12} className="btn">
										<Button
											variant="contained"
											color="primary"
											type="submit"
											style={{ marginTop: 16 }}
										>
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
