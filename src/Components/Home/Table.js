import React, { createContext, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import BlockTarget from './BlockTarget';
import Block from './Block';
import { useSelector } from 'react-redux';

export const TableContext = createContext({
	deleteFromTarget: null,
	addToTarget: null,
	unAllotInvigilator: null,
	updateInvigilator: null,
});

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#7986CB',
		color: theme.palette.common.white,
		minWidth: 200,
		borderRight: '1px solid white',
	},
	body: {
		fontSize: 14,
		width: 200,
		padding: 0,
		height: 300,
		borderRight: '1px solid grey',
		borderBottom: '1px solid grey',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {},
}))(TableRow);

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
					<TableRow>
						<StyledTableCell width="100px">Slot</StyledTableCell>
						{dates.map((el) => (
							<StyledTableCell align="center">{el.formattedDate}</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows?.map((row, i) => (
						<StyledTableRow key={row.name}>
							<StyledTableCell
								width="100px"
								component="th"
								scope="row"
								style={{
									padding: 20,
									background: '#9FA8DA33',
									borderLeft: '2px solid #9FA8DA',
								}}
							>
								{row.name}
							</StyledTableCell>
							{row.data?.map((blocks, j) => (
								<StyledTableCell>
									{/* <BlockTarget row={i} col={j} target="table">
											{blocks?.map((group) => {
												return group.courses?.length ? (
													<div
														style={{
															border: '1px solid #9FA8DA',
															margin: 10,
															background: '#9FA8DA33',
															paddingBottom: 2,
														}}
													>
														<div
															style={{
																background: '#9FA8DA',
																textAlign: 'left',
																padding: 5,
																color: 'white',
															}}
														>
															{group.courses[0].slot}
														</div>
														{group.courses.map((el) => {
															return (
																<div>HI</div>
																// <Block
																// 	data={el}
																// 	allotInvigilator={allotInvigilator}
																// 	unAllotInvigilator={unAllotInvigilator}
																// 	row={i}
																// 	col={j}
																// />
															);
														})}
													</div>
												) : null;
											})}
										</BlockTarget> */}
								</StyledTableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MainTable;
