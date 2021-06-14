import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import { useDispatch } from 'react-redux';
import { allotInvigilator, unAllotInvigilator, updateInvigilator } from '../../redux/actions/tableActions';

const InvigilatorSelect = ({ data, index, row, col }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<select
				style={{ width: '70%' }}
				onChange={(e) => {
					dispatch(updateInvigilator(row, col, data, index, e.target.value));
				}}
			>
				{data.recommendedInvigilators.map((el) => {
					return <option value={el}>{el}</option>;
				})}
				<option disabled>-----------</option>
				<option value="JAJATI KESHARI SAHOO">JAJATI KESHARI SAHOO</option>
				<option value="AMIT SETIA">AMIT SETIA</option>
			</select>
			<button
				style={{ background: 'transparent' }}
				onClick={() => {
					dispatch(unAllotInvigilator(row, col, data, index));
				}}
			>
				X
			</button>
		</div>
	);
};

const Block = ({ data, row, col }) => {
	const dispatch = useDispatch();

	const [{ isDragging }, drag] = useDrag({
		item: {
			type: ItemTypes.CARD,
			data,
			row,
			col,
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [invigilatorOpen, setInvigilatorOpen] = useState(false);
	const [instructorOpen, setInstructorOpen] = useState(false);

	return (
		<Box
			ref={drag}
			boxShadow={3}
			margin="10px"
			style={{
				background: '#9FA8DA',
				borderRadius: '5px',
				opacity: isDragging ? '0.5' : '1',
				cursor: 'move',
			}}
		>
			<div
				style={{
					fontSize: 16,
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'left',
					padding: 5,
				}}
			>
				{data.name}
			</div>
			<div
				style={{
					fontSize: 12,
					background: 'white',
					borderBottom: '1px solid #3f51b5',
					color: '#9FA8DA',
					textAlign: 'left',
					padding: 5,
					cursor: 'pointer',
				}}
				onClick={() => setInstructorOpen(!instructorOpen)}
			>
				Instructors ({data.instructors?.length || 0}) {instructorOpen ? '▲' : '▼'}
			</div>
			{instructorOpen ? (
				<div
					style={{
						fontSize: 12,
						color: 'white',
						textAlign: 'left',
						paddingLeft: 4,
					}}
				>
					{data.instructors?.map((el) => {
						return <div style={{ padding: 2, marginBottom: 2, marginTop: 2 }}>{el}</div>;
					})}
				</div>
			) : null}
			<div
				style={{
					fontSize: 12,
					textAlign: 'left',
					padding: 5,
					cursor: 'pointer',
					background: 'white',
					borderBottom: '1px solid #3f51b5',
					color: '#9FA8DA',
				}}
				onClick={() => setInvigilatorOpen(!invigilatorOpen)}
			>
				Invigilators ({data.allotedInvigilators?.length}) {invigilatorOpen ? '▲' : '▼'}
			</div>

			{invigilatorOpen ? (
				<div
					style={{
						fontSize: 12,
						color: 'white',
						textAlign: 'left',
						paddingLeft: 4,
						paddingTop: 5,
					}}
				>
					{data.allotedInvigilators.map((el, index) => {
						return <InvigilatorSelect data={data} index={index} row={row} col={col} />;
					})}
					{row === -1 ? null : (
						<button
							style={{ background: 'transparent', marginBottom: 10 }}
							onClick={() => {
								dispatch(
									allotInvigilator(
										row,
										col,
										data,
										data.recommendedInvigilators.length > 0
											? data.recommendedInvigilators[0]
											: 'None'
									)
								);
							}}
						>
							+ Add new
						</button>
					)}
				</div>
			) : null}

			<div
				style={{
					fontSize: 12,
					textAlign: 'left',
					padding: 5,
					paddingLeft: 5,
					cursor: 'pointer',
					background: 'white',
					borderBottom: '1px solid #3f51b5',
					color: '#9FA8DA',
				}}
				onClick={() => {}}
			>
				Classrooms ▼
			</div>

			<div
				style={{
					fontSize: 14,
					padding: 5,
					paddingLeft: 10,
					color: '#9FA8DA',
					textAlign: 'left',
					marginTop: 0,
					background: 'white',
					borderRadius: '0 0 5px 5px',
					display: 'flex',
				}}
			>
				<Grid container direction="row" spacing={0}>
					<Grid item>
						<PeopleIcon fontSize="small"></PeopleIcon>
					</Grid>
					<Grid item> {' ' + data.capacity}</Grid>
				</Grid>
			</div>
		</Box>
	);
};

export default Block;
