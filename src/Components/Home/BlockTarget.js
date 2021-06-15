import React from 'react';
import { Box } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import { useDispatch } from 'react-redux';
import { addBlock, addToTarget, deleteBlock, deleteFromTarget } from '../../redux/actions/tableActions';

const BlockTarget = ({ row, col, target, children }) => {
	const dispatch = useDispatch();

	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item) => {
			if (target === 'sidebar' && item.row === -1) {
				return;
			}

			if (item.row === -1) {
				dispatch(deleteBlock(item.data._id));
			} else {
				dispatch(deleteFromTarget(item.data.name, item.row, item.col));
			}

			if (target === 'table') {
				dispatch(addToTarget(item.data, row, col));
			} else {
				dispatch(addBlock(item.data));
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	return (
		<Box
			ref={drop}
			className="box"
			style={{
				background: isOver ? '#7986CB33' : '',
				transitionDuration: '0.5s',
				height: '100%',
				width: '100%',
				overflow: 'auto',
			}}
		>
			{children}
		</Box>
	);
};

export default BlockTarget;
