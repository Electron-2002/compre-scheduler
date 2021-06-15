import React from 'react';
import { useSelector } from 'react-redux';
import BlockTarget from './BlockTarget';
import Block from './Block';
import './Sidebar.css';
const Sidebar = () => {
	const table = useSelector((state) => state.table);

	return (
		<BlockTarget target="sidebar" className="sidebar">
			<div className="head">
				<div>Unalloted</div>
			</div>
			{table.blocks.map((group, i) => {
				return group.courses?.length ? (
					<div key={i} className="sidebar-content">
						<div className="sidebar-slots">{group.courses[0].slot}</div>
						{group.courses.map((el, j) => {
							if (el.state) return <Block data={el} row={-1} col={-1} key={j} />;
							else return <></>;
						})}
					</div>
				) : null;
			})}
		</BlockTarget>
	);
};

export default Sidebar;
