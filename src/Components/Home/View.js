import React from 'react';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import './View.css';

const groupByDate = (table, dates) => {
	let examByDate = {};
	dates.forEach((i) => {
		let d = new Date(i.exact);
		let b = d.toISOString().substring(0, 10);
		examByDate[b] = [];
	});
	table.rows[0].data.forEach((i) => {
		i.forEach((k) => {
			k.courses.forEach((l) => {
				let currDate = l.date.substring(0, 10);
				if (!examByDate[currDate]) examByDate[currDate] = [];
				examByDate[currDate].push({ course: l.course.bits_id, slot: 1 });
			});
		});
	});
	table.rows[1].data.forEach((i) => {
		i.forEach((k) => {
			k.courses.forEach((l) => {
				let currDate = l.date.substring(0, 10);
				if (!examByDate[currDate]) examByDate[currDate] = [];
				examByDate[currDate].push({ course: l.course.bits_id, slot: 2 });
			});
		});
	});
	console.log(examByDate);
	return examByDate;
};

const View = () => {
	const table = useSelector((state) => state.table);
	const { dates } = table;

	let examByDate = groupByDate(table, dates);
	return (
		<TableContainer style={{ height: 'calc(100vh - 64px)' }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{dates.map((date) => (
							<TableCell>{date.formatted}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						{Object.keys(examByDate).map((j, k) => {
							return (
								<TableCell>
									<div className="d-flex col">
										<Chip label="Slot 1" color="primary" size="small" />
										{examByDate[j].map((i, l) => {
											if (i.slot == 1)
												return <Chip variant="outlined" label={i.course} size="small" />;
										})}
										<Chip label="Slot 1" color="primary" size="small" />
										{examByDate[j].map((i, l) => {
											if (i.slot == 2)
												return <Chip variant="outlined" label={i.course} size="small" />;
										})}
									</div>
								</TableCell>
							);
						})}
					</TableRow>
				</TableBody>
			</Table>
			{/* <Table stickyHeader>
				<TableHead>
					<TableRow>
						{dates.slice(8, dates.length).map((date) => (
							<TableCell>{date.formatted}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody></TableBody>
			</Table> */}
		</TableContainer>
	);
};

export default View;
