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
import Block from './Block';
import { useSelector } from 'react-redux';
import './Table.css';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
		minHeight: 'calc(100vh - 64px)',
		overflow: 'auto',
	},
});

const MainTable = () => {
	const classes = useStyles();

	const rows = useSelector((state) => state.table.rows);
	const dates = useSelector((state) => state.table.dates);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableCell className="styledTableCellHead" width="40px">
						Dates
					</TableCell>
					{rows?.map((row, i) => (
						<TableCell
							width="100px"
							component="th"
							scope="row"
							className="bg-blue p-20px cell-border-left styledTableCellHead"
						>
							{row.name}
						</TableCell>
					))}
				</TableHead>
				<TableBody>
					{dates.map((el, i) => (
						<TableRow>
							<TableCell className="styledTableCell" align="center" key={i}>
								{el.formattedDate}
							</TableCell>
							{rows?.map((row, i) =>
								row.data?.map((blocks, j) => (
									<TableCell className="styledTableCell min-widht-200" key={j}>
										<BlockTarget row={i} col={j} target="table" className="blockTarget">
											{blocks?.map((group, index) => {
												return group.courses?.length ? (
													<div key={index} className="bg-blue m-10px">
														<div className="slotCourseBox">{group.courses[0].slot}</div>
														{group.courses.map((el, k) => {
															return <Block data={el} row={i} col={j} key={k} />;
														})}
													</div>
												) : null;
											})}
										</BlockTarget>
									</TableCell>
								))
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MainTable;
