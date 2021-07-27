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
import { useDispatch, useSelector } from 'react-redux';
import { allotInvigilator, unAllotInvigilator, updateInvigilator } from '../../redux/actions/tableActions';
import './Block.css';

const InvigilatorSelect = ({ data }) => {
	const [isSaved, setSave] = useState(false);
	const [invigilatorData, setInvigilatorData] = useState({});

	const dispatch = useDispatch();

	const invigilators = useSelector((state) => state.table.invigilators);
	const classrooms = useSelector((state) => state.table.rooms);
	let allotedArr = [];
	{
		data.exam_rooms.map((i, k) => {
			i.invigilatorsAlloteds.map((j) => {
				allotedArr.push({
					invigilator: j.invigilator?.name || j.name,
					room: i.room?.name || i.name,
					invigilators_id: j.invigilators_id,
					room_id: i.room_id,
				});
			});
		});
	}
	return (
		<div>
			{allotedArr.map((i) => (
				<div className="d-flex">
					<span className="alloted">{i.invigilator}</span> &nbsp; <span className="alloted">{i.room}</span>{' '}
					&nbsp;{' '}
					<span>
						<IconButton style={{ width: '5%', marginLeft: '2.5px' }} size="small">
							<DeleteIcon
								fontSize="inherit"
								onClick={() =>
									dispatch(
										unAllotInvigilator(data, {
											invigilators_id: i.invigilators_id,
											room_id: i.room_id,
										})
									)
								}
							/>
						</IconButton>
					</span>
				</div>
			))}
			<select
				className="invigilatorSelect"
				onChange={(e) => {
					setSave(false);
					let invi = invigilators.find((i) => i.id === e.target.value);
					setInvigilatorData({ ...invigilatorData, invigilator: invi });
				}}
			>
				{/* {data.recommendedInvigilators.map((el) => {
					return <option value={el}>{el}</option>;
				})} */}
				<option value="null">-----------</option>
				{invigilators.map((el) => (
					<option value={el.id}>{el.name}</option>
				))}
			</select>
			<select
				className="invigilatorSelect"
				onChange={(e) => {
					setSave(false);
					let room = classrooms.find((i) => i.id === e.target.value);
					setInvigilatorData({ ...invigilatorData, classroom: room });
				}}
			>
				{/* {data.recommendedInvigilators.map((el) => {
					return <option value={el}>{el}</option>;
				})} */}
				<option value="null">-----------</option>
				{classrooms.map((el) => (
					<option value={el.id}>{el.name}</option>
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
					if (!invigilatorData.invigilator) return;
					dispatch(updateInvigilator(data, invigilatorData));
					setSave(true);
				}}
				size="small"
			>
				<CheckIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
};

const Block = ({ data, row, col }) => {
	// console.log({ data, row, col });
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
			<div className="subject">{data.course.bits_id}</div>
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
					<InvigilatorSelect row={row} col={col} data={data} />
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
