import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import Block from './Block';
import './BlockList.css';

const BlockList = ({ courses, row, col }) => {
	const [{ isDragging }, drag] = useDrag({
		item: {
			type: ItemTypes.LIST,
			data: courses,
			row,
			col,
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [toggle, setToggle] = useState(false);

	return (
		<div className="sidebar-content" ref={drag} style={{ opacity: isDragging ? '0.5' : '1' }}>
			<div className="sidebar-slots">
				<span>{courses[0].course.block}</span>
				<span onClick={() => setToggle(!toggle)} style={{ cursor: 'pointer' }}>
					{toggle ? '▲' : '▼'}
				</span>
			</div>
			{toggle &&
				courses.map((course, j) => {
					return !course.state ? <Block data={course} row={row} col={col} key={j} /> : null;
				})}
		</div>
	);
};

export default BlockList;
