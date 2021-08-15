import React, { useState, useRef } from 'react';
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
import { unAllotInvigilator, updateInvigilator } from '../../redux/actions/tableActions';
import './Block.css';

const InvigilatorSelect = ({ data, row, col, invList }) => {
	const [invigilatorData, setInvigilatorData] = useState({});
	const invigilatorRef = useRef();
	const classroomRef = useRef();
	const dispatch = useDispatch();

	const classrooms = useSelector((state) => state.table.rooms);
	let allotedArr = [];
	{
		data.exam_rooms.map((i, k) => {
			i.invigilatorsAlloteds.map((j) => {
				allotedArr.push({
					invigilator: j.invigilator?.name || j.name,
					room: i.room?.name || i.name,
					invigilators_id: j.invigilator?.id,
					room_id: i.room?.id,
					dept: j.invigilator?.dept || j.dept,
				});
			});
		});
	}
	return (
		<div>
			{allotedArr.map((i) => (
				<div className="d-flex">
					<span className="alloted">
						{i.invigilator}[{i.dept}]
					</span>{' '}
					&nbsp; <span className="alloted">{i.room}</span> &nbsp;{' '}
					<span>
						<IconButton style={{ width: '5%', marginLeft: '2.5px' }} size="small">
							<DeleteIcon
								fontSize="inherit"
								onClick={() =>
									dispatch(
										unAllotInvigilator(data, row, col, {
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
				ref={classroomRef}
				onChange={(e) => {
					let invi = invList.find((i) => i.id === e.target.value);
					setInvigilatorData({ ...invigilatorData, invigilator: invi });
				}}
			>
				<option value="null">-----------</option>
				{invList.map((el) => (
					<option value={el.id} key={el.id}>
						{el.name} [{el.dept}]
					</option>
				))}
			</select>
			<select
				className="invigilatorSelect"
				ref={invigilatorRef}
				onChange={(e) => {
					let room = classrooms.find((i) => i.id === e.target.value);
					setInvigilatorData({ ...invigilatorData, classroom: room });
				}}
			>
				<option value="null">-----------</option>
				{classrooms.map((el) => (
					<option value={el.id} key={el.id}>
						{el.name}
					</option>
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
					dispatch(updateInvigilator(data, row, col, invigilatorData));
					setInvigilatorData(() => {});
					invigilatorRef.current.value = null;
					classroomRef.current.value = null;
				}}
				size="small"
			>
				<CheckIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
};

const Block = ({ data, row, col, invList }) => {
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
	let totalInvigilatorsAlloted = 0;
	let allotedCapacity = 0;
	data.exam_rooms.forEach((i) => {
		totalInvigilatorsAlloted += i.invigilatorsAlloteds?.length;
		allotedCapacity += i.capacity;
	});

	return (
		<Box
			ref={drag}
			boxShadow={3}
			margin="10px"
			className="courseBox"
			style={{
				opacity: isDragging ? '0.5' : '1',
			}}
		>
			<div
				className="subject"
				style={{ backgroundColor: allotedCapacity === data.course.capacity ? '#49da49' : '#9fa8da' }}
			>
				{data.course.bits_id}
			</div>
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
				Invigilators ({totalInvigilatorsAlloted}) : Classrooms ({data.exam_rooms?.length}){' '}
				{invigilatorOpen ? '▲' : '▼'}
			</div>

			{invigilatorOpen ? (
				<div className="invigilatorOpen">
					<InvigilatorSelect row={row} col={col} data={data} invList={invList} />
				</div>
			) : null}

			<div className="totalStrength">
				<Grid container direction="row" spacing={2}>
					<Grid item>
						<PeopleIcon fontSize="small"></PeopleIcon>
					</Grid>
					<Grid item> Total : {' ' + data.course.capacity}</Grid>
					<Grid item> Allotted : {' ' + allotedCapacity}</Grid>
				</Grid>
			</div>
		</Box>
	);
};

export default Block;
