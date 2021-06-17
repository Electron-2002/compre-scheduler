import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Components/Home/Navigation';
import './Home.css';

const exportData = [
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
];

const Exports = () => {
	return (
		<div>
			<Navigation />
			<Grid container justify="space-around" className="main-container">
				{exportData.map((obj) => (
					<Grid container xs={5} className="savedSchedule" justify="space-between" alignItems="center">
						<Grid item xs={8}>
							<Typography variant="body1">
								<Box fontWeight="fontWeightBold" marginBottom={1}>
									{obj.title}
								</Box>
								<Box fontSize={14}>
									{obj.desc.split('\n').map((i) => (
										<>
											{i}
											<br />
										</>
									))}
								</Box>
							</Typography>
						</Grid>
						<Grid item xs={3} className="mt-auto">
							<Button className="savedScheduleButton" variant="contained" color="primary">
								Export
							</Button>
						</Grid>
					</Grid>
				))}
			</Grid>
		</div>
	);
};
export default Exports;
