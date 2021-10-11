import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';

const View = () => {
	const table = useSelector((state) => state.table);

	const { dates } = table;

	return (
		<TableContainer style={{ height: 'calc(100vh - 64px)' }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{dates.slice(0, 8).map((date) => (
							<TableCell>{date.formatted}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>Hello</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{dates.slice(8, dates.length).map((date) => (
							<TableCell>{date.formatted}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody></TableBody>
			</Table>
		</TableContainer>
	);
};

export default View;
