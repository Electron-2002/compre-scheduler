import React, { useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
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

const InvigilatorSelect = ({ data, row, col, invList = [], teamList, roomList }) => {
	const [invigilatorData, setInvigilatorData] = useState({});
	const [roomData, setRoomData] = useState({});
	const invigilatorRef = useRef();
	const classroomRef = useRef();
	const dispatch = useDispatch();

	const classrooms = roomList;
	const dates = useSelector((state) => state.table.dates);

	let allotedArr = [];
	{
		data.exam_rooms.map((i, k) => {
			console.log(i);
			i.invigilatorsAlloteds.map((j) => {
				allotedArr.push({
					invigilator: j.invigilator?.name || j.name,
					room: i.room?.name || i.name,
					invigilators_id: j.invigilator?.id,
					room_id: i.room?.id,
					dept: j.invigilator?.dept || j.dept,
					tooltip: `${j.invigilator.dept} ${j.invigilator.stat1} ${j.invigilator.stat2 ?? ''}`,
					assignedDuties: j.invigilator.assignedDuties,
				});
			});
		});
	}
	const teamIds = teamList.map((member) => member.id);
	invList.forEach((inv) => {
		if (teamIds.includes(inv.id)) {
			inv['isTeamMember'] = true;
			inv['priority'] = 0;
		} else if (inv.dept === data.course.discipline) {
			inv['isTeamMember'] = false;
			if (inv.stat1 && inv.stat1.toLowerCase().includes('professor')) {
				inv['priority'] = 1;
			} else if (inv.stat1 && inv.stat1.toLowerCase().includes('phd')) {
				inv['priority'] = 2;
			} else if (inv.stat1 && inv.stat1.toLowerCase().includes('me ta')) {
				inv['priority'] = 3;
			}
		} else {
			inv['priority'] = 100;
		}
	});

	return (
		<div>
			{allotedArr.map((i) => (
				<div key={i.id} className="d-flex">
					<Tooltip title={i.tooltip} arrow placement="top-start" style={{ width: '5%' }}>
						<IconButton aria-label="info" size="small">
							<InfoIcon fontSize="inherit" />
						</IconButton>
					</Tooltip>
					<span className="alloted">
						{i.invigilator}[{i.dept}]
					</span>{' '}
					&nbsp; <span className="alloted">{i.room}</span> &nbsp;{' '}
					<span>
						<IconButton
							onClick={() =>
								dispatch(
									unAllotInvigilator(data, row, col, {
										invigilators_id: i.invigilators_id,
										room_id: i.room_id,
										room_name: i.room,
										invigilator: i,
									})
								)
							}
							style={{ width: '5%', marginLeft: '2.5px' }}
							size="small"
						>
							<DeleteIcon fontSize="inherit" />
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
				{invList
					.filter((el) => +el.duties_to_be_alloted > el.assignedDuties)
					.filter((el) => {
						if (el.unavailableDates) {
							for (let idx = 0; idx < el.unavailableDates.length; ++idx) {
								const day = new Date(+el.unavailableDates[idx]);
								if (
									day.getFullYear() === dates[col].exact.getFullYear() &&
									day.getMonth() === dates[col].exact.getMonth() &&
									day.getDate() === dates[col].exact.getDate()
								) {
									return false;
								}
							}
						}
						return true;
					})
					.sort((a, b) => a.priority - b.priority)
					.map((el) => (
						<option value={el.id} key={el.id} style={el.alreadyAllotted ? { backgroundColor: 'red' } : {}}>
							{el.name} [{`${el.dept} ${el.stat1}`}] {el.isTeamMember ? '[Team Member]' : ''}
							{el.alreadyAllotted && '(Same day other slot allotted)'}
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

const Block = ({ data, row, col, invList, roomList }) => {
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
		allotedCapacity += +i.capacity;
	});

	if (allotedCapacity > data.course.capacity) allotedCapacity = data.course.capacity;

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
				Instructors ({data.course.invigilators?.length || 0}) {instructorOpen ? '▲' : '▼'}
			</div>
			{instructorOpen ? (
				<div className="instructorOpen">
					{data.course.invigilators?.map((el) => {
						return (
							<div key={el.id} style={{ padding: 2, marginBottom: 2, marginTop: 2 }}>
								{el.name}
							</div>
						);
					})}
				</div>
			) : null}
			<div className="invigilator" onClick={() => setInvigilatorOpen(!invigilatorOpen)}>
				Invigilators ({totalInvigilatorsAlloted}) : Classrooms ({data.exam_rooms?.length}){' '}
				{invigilatorOpen ? '▲' : '▼'}
			</div>

			{invigilatorOpen ? (
				<div className="invigilatorOpen">
					<InvigilatorSelect
						row={row}
						col={col}
						data={data}
						teamList={data.course.invigilators}
						invList={invList}
						roomList={roomList}
					/>
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
