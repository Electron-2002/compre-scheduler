import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PeopleIcon from '@material-ui/icons/People';
import { useDrag } from 'react-dnd';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { ItemTypes } from '../../utils/items';
import { useDispatch } from 'react-redux';
import { allotInvigilator, unAllotInvigilator, updateInvigilator } from '../../redux/actions/tableActions';
import './Block.css';

const InvigilatorSelect = ({ data, index, row, col }) => {
	const [isSaved, setSave] = useState(false);
	const [invigilatorData, setInvigilatorData] = useState({});

	const dispatch = useDispatch();

	const invigilators = ['Jajati Keshari', 'Amit Sethia', 'Anup Mathew', 'Neena'];
	const classrooms = ['C301', 'C302', 'C402'];

	return (
		<div>
			<select
				className="invigilatorSelect"
				onChange={(e) => {
					setSave(false);
					setInvigilatorData({ ...invigilatorData, invigilator: e.target.value });
				}}
			>
				{data.recommendedInvigilators.map((el) => {
					return <option value={el}>{el}</option>;
				})}
				<option value="null">-----------</option>
				{invigilators.map((el) => (
					<option value={el}>{el}</option>
				))}
			</select>
			<select
				className="invigilatorSelect"
				onChange={(e) => {
					setSave(false);
					setInvigilatorData({ ...invigilatorData, classroom: e.target.value });
				}}
			>
				{data.recommendedInvigilators.map((el) => {
					return <option value={el}>{el}</option>;
				})}
				<option value="null">-----------</option>
				{classrooms.map((el) => (
					<option value={el}>{el}</option>
				))}
			</select>
			<Tooltip title="Tooltip" arrow placement="top-start" style={{ width: '5%' }}>
				<IconButton aria-label="info" size="small">
					<InfoIcon fontSize="inherit" />
				</IconButton>
			</Tooltip>
			<IconButton
				style={{ width: '5%' }}
				aria-label="delete"
				onClick={() => {
					if (isSaved) {
						dispatch(unAllotInvigilator(row, col, data, index));
						setSave(false);
					} else {
						if (!invigilatorData.invigilator) return;
						dispatch(updateInvigilator(row, col, data, index, ''));
						setSave(true);
					}
				}}
				size="small"
			>
				{isSaved ? <DeleteIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
			</IconButton>
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
		<Box ref={drag} boxShadow={3} margin="10px" className="courseBox" style={{ opacity: isDragging ? '0.5' : '1' }}>
			<div className="subject">{data.bits_id}</div>
			<div className="instructor" onClick={() => setInstructorOpen(!instructorOpen)}>
				Instructors ({data.instructors?.length || 0}) {instructorOpen ? '▲' : '▼'}
			</div>
			{instructorOpen ? (
				<div className="instructorOpen">
					{data.instructors?.map((el) => {
						return <div style={{ padding: 2, marginBottom: 2, marginTop: 2 }}>{el}</div>;
					})}
				</div>
			) : null}
			<div className="invigilator" onClick={() => setInvigilatorOpen(!invigilatorOpen)}>
				Invigilators ({data.allotedInvigilators?.length}) : Classrooms {invigilatorOpen ? '▲' : '▼'}
			</div>

			{invigilatorOpen ? (
				<div className="invigilatorOpen">
					{data.allotedInvigilators.map((el, index) => {
						return <InvigilatorSelect data={data} key={index} index={index} row={row} col={col} />;
					})}
					{row === -1 ? null : (
						<Button
							variant="outlined"
							size="small"
							style={{ background: 'transparent', margin: 10 }}
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
							Add New
						</Button>
					)}
				</div>
			) : null}

			{/* <div className="classroom" onClick={() => {}}>
				Classrooms ▼
			</div> */}

			<div className="totalStrength">
				<Grid container direction="row" spacing={2}>
					<Grid item>
						<PeopleIcon fontSize="small"></PeopleIcon>
					</Grid>
					<Grid item> Total : {' ' + data.capacity}</Grid>
					<Grid item> Allotted : {' ' + data.capacity}</Grid>
				</Grid>
			</div>
		</Box>
	);
};

export default Block;
