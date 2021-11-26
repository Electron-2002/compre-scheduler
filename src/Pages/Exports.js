import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Navigation from '../Components/Home/Navigation';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { output1, output2, output3, output4, output5, output6, output7 } from '../redux/actions/tableActions';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { invCompare } from '../utils/sort';

const data = [
	{
		title: 'Report in Excel',
		desc: '(Course No., Title, Date, Time, Room list,\n No. of students in each room, No. of Invigilators Required, No. of Invigilators given)',
	},
	{
		title: 'Report in Excel',
		desc: '(Date, Time, Course, Course Title, Discipline,\n Name, Email, PSRN/ID No., Mobile, IC)',
	},
	{
		title: 'Report of Invigilator details for IC',
		desc: '(Name, Discipline, ID No., Contact)',
	},
	{
		title: 'Details of duties given for invigilators',
		desc: 'Grouped by IC, PhD, ME, TA\n(Date, Time, Course No. Course Title, Email, Mobile)',
	},
	{
		title: 'Report in Excel',
		desc: 'Invigilators with more than one duty per day',
	},
	{
		title: 'Report in Excel',
		desc: "Every invigilators' no of invigilation with a column denoting their designation",
	},
	{
		title: 'Report in Excel',
		desc: 'Allotting classrooms to students based on registration data',
	},
];

const Exports = () => {
	const dispatch = useDispatch();

	const table = useSelector((state) => state.table);
	const courseList = table.courseList;
	const invigilators = table.invigilators;

	const [course, setCourse] = useState('');
	const [invigilator, setInvigilator] = useState('');

	const handleChangeCourse = (e) => {
		setCourse(e.target.value);
	};

	const handleChangeInvigilator = (e) => {
		setInvigilator(e.target.value);
	};

	const output3Handler = () => {
		if (course === '') return;
		dispatch(output3(course));
	};

	const output4Handler = () => {
		if (invigilator === '') return;
		dispatch(output4(invigilator));
	};

	if (!table.id) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<Navigation />
			<Grid container justify="space-around" className="main-container" style={{ marginTop: -10 }}>
				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[0].title}
							</Box>
							<Box fontSize={14}>
								{data[0].desc.split('\n').map((text) => (
									<>
										{text}
										<br />
									</>
								))}
							</Box>
						</Typography>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={() => dispatch(output1())}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[1].title}
							</Box>
							<Box fontSize={14}>
								{data[1].desc.split('\n').map((text) => (
									<>
										{text}
										<br />
									</>
								))}
							</Box>
						</Typography>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={() => dispatch(output2())}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[2].title}
							</Box>
							<Box fontSize={14}>
								{data[2].desc.split('\n').map((text) => (
									<>
										{text}
										<br />
									</>
								))}
							</Box>
						</Typography>
						<FormControl fullWidth margin="dense">
							<InputLabel>Course</InputLabel>
							<Select value={course} onChange={handleChangeCourse}>
								{courseList.map((course) => {
									return (
										<MenuItem value={course.id} key={course.id}>
											{course.bitsId}: {course.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={output3Handler}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[3].title}
							</Box>
							<Box fontSize={14}>
								{data[3].desc.split('\n').map((text) => (
									<>
										{text}
										<br />
									</>
								))}
							</Box>
						</Typography>
						<FormControl fullWidth margin="dense">
							<InputLabel>Invigilators</InputLabel>
							<Select value={invigilator} onChange={handleChangeInvigilator}>
								{invigilators.sort(invCompare).map((inv) => (
									<MenuItem value={inv.psrn_no} key={inv.id}>
										{inv.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={output4Handler}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[4].title}
							</Box>
							<Box fontSize={14}>{data[4].desc}</Box>
						</Typography>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={() => dispatch(output5())}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[5].title}
							</Box>
							<Box fontSize={14}>{data[5].desc}</Box>
						</Typography>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={() => dispatch(output6())}
						>
							Export
						</Button>
					</Grid>
				</Grid>

				<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
					<Grid item xs={8}>
						<Typography variant="body1">
							<Box fontWeight="fontWeightBold" marginBottom={1}>
								{data[6].title}
							</Box>
							<Box fontSize={14}>{data[6].desc}</Box>
						</Typography>
					</Grid>
					<Grid item xs={3} className="mt-auto">
						<Button
							className="savedScheduleButton"
							variant="contained"
							color="primary"
							onClick={() => dispatch(output7())}
						>
							Export
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};
export default Exports;
