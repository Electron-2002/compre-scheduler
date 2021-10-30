import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BlockTarget from './BlockTarget';
import BlockList from './BlockList';
import { useSelector } from 'react-redux';
import './Table.css';
import { compareFn } from '../../utils/sort';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
		minHeight: 'calc(100vh - 64px)',
		overflow: 'auto',
	},
});

const MainTable = () => {
	const classes = useStyles();

	const table = useSelector((state) => state.table);
	const rows = table.rows;
	const dates = table.dates;
	const invigilators = table.invigilators;
	const slots = table.slots;

	return (
		<TableContainer style={{ height: 'calc(100vh - 64px)' }} component={Paper}>
			<Table stickyHeader className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<TableCell className="styledTableCellHead" width="40px" align="center">
							Dates
						</TableCell>
						{slots?.map((slot, i) => (
							<TableCell
								key={i}
								width="100px"
								component="th"
								scope="row"
								className="bg-blue p-20px cell-border-left styledTableCellHead"
								align="center"
							>
								{slot}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dates.map((date, i) => (
						<TableRow key={i}>
							<TableCell className="styledTableCell" align="center">
								{date.formatted}
							</TableCell>
							{rows?.map((row, j) => {
								const invId = invigilators.map((inv) => inv.id);

								let allotedList = [];
								for (const group of row.data[i]) {
									group.courses.forEach((course) => {
										course.exam_rooms.forEach((room) => {
											room.invigilatorsAlloteds.forEach((inv) => {
												allotedList = [...allotedList, inv.invigilator];
											});
										});
									});
								}

								const allotedId = allotedList.map((alloted) => alloted.id);
								const finalList = [];
								invId.forEach((x, i) => {
									if (!allotedId.includes(x)) {
										finalList.push(invigilators[i]);
									}
								});

								return (
									<TableCell className="styledTableCell min-width-200" key={j}>
										<BlockTarget row={j} col={i} target="table" className="blockTarget">
											{row.data[i]?.sort(compareFn).map((group, index) => {
												return (
													group.courses?.length > 0 && (
														<BlockList
															courses={group.courses}
															key={index}
															row={j}
															col={i}
															invList={finalList}
														/>
													)
												);
											})}
										</BlockTarget>
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MainTable;
