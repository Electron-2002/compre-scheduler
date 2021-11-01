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

	for (let index = 0; index < table.slots.length; index++) {
		table.rows[index].data.forEach((i) => {
			i.forEach((k) => {
				k.courses.forEach((l) => {
					let currDate = l.date.substring(0, 10);
					if (!examByDate[currDate]) examByDate[currDate] = [];
					examByDate[currDate].push({ course: l.course.bits_id, slot: l.time });
				});
			});
		});
	}
	console.log(examByDate);
	return examByDate;
};

const View = () => {
	const table = useSelector((state) => state.table);
	const { dates } = table;
	console.log(table);
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
								<TableCell className="view-tablecell">
									<div className="d-flex col">
										{table.slots.map((slot) => (
											<>
												<Chip label={slot} color="primary" size="small" />
												{examByDate[j].map((i) => {
													if (i.slot === slot)
														return (
															<Chip variant="outlined" label={i.course} size="small" />
														);
												})}
											</>
										))}
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
