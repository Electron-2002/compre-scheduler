import React from 'react';
import { useSelector } from 'react-redux';
import BlockTarget from './BlockTarget';
import BlockList from './BlockList';
import './Sidebar.css';
import { compareFn } from '../../utils/sort';

const Sidebar = () => {
	const table = useSelector((state) => state.table);

	return (
		<BlockTarget target="sidebar" className="sidebar">
			<div className="head">Blocks</div>
			<div className="sidebar-block">
				{table.blocks.sort(compareFn).map((group, i) => {
					return group.courses?.length > 0 && <BlockList courses={group.courses} key={i} row={-1} col={-1} />;
				})}
			</div>
		</BlockTarget>
	);
};

export default Sidebar;
