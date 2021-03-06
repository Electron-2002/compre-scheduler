import React from 'react';
import { Box } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import { useDispatch } from 'react-redux';
import { addBlock, addToTarget, deleteBlock, deleteFromTarget } from '../../redux/actions/tableActions';
import './Block.css';

const BlockTarget = ({ row, col, target, children }) => {
	const dispatch = useDispatch();

	const cardHandler = (exam, r, c) => {
		if (r === -1) {
			dispatch(deleteBlock(exam.course.id));
		} else {
			dispatch(deleteFromTarget(exam.course.id, r, c));
		}

		if (target === 'table') {
			dispatch(addToTarget(exam, row, col));
		} else {
			dispatch(addBlock(exam));
		}
	};

	const dropHandler = (item) => {
		if (target === 'sidebar' && item.row === -1) {
			return;
		}

		switch (item.type) {
			case ItemTypes.CARD:
				cardHandler(item.data, item.row, item.col);
				return;

			case ItemTypes.LIST:
				item.data.forEach((course) => {
					cardHandler(course, item.row, item.col);
				});
				return;

			default:
				return;
		}
	};

	const [{ isOver }, drop] = useDrop({
		accept: [ItemTypes.CARD, ItemTypes.LIST],
		drop: dropHandler,
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	return (
		<Box
			ref={drop}
			className="box blockTarget"
			style={{
				background: isOver ? '#7986CB33' : '',
			}}
		>
			{children}
		</Box>
	);
};

export default BlockTarget;
