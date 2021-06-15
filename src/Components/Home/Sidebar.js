import React from 'react';
import { useSelector } from 'react-redux';
import BlockTarget from './BlockTarget';
import Block from './Block';

const Sidebar = () => {
	const table = useSelector((state) => state.table);

	return (
		<BlockTarget target="sidebar">
			{table.blocks.map((group, i) => {
				return group.courses?.length ? (
					<div
						key={i}
						style={{
							border: '1px solid #9FA8DA',
							margin: 10,
							background: '#9FA8DA33',
							paddingBottom: 5,
						}}
					>
						<div
							style={{
								background: '#9FA8DA',
								textAlign: 'left',
								padding: 5,
								color: 'white',
							}}
						>
							{group.courses[0].slot}
						</div>
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
