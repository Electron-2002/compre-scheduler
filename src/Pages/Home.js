import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions/tableActions';
import Grid from '@material-ui/core/Grid';
import Navigation from '../Components/Home/Navigation';
import Table from '../Components/Home/Table';
import Block from '../Components/Home/Block';
import BlockTarget from '../Components/Home/BlockTarget';

const Home = () => {
	const dispatch = useDispatch();

	const blocks = useSelector((state) => state.table.blocks);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<div>
			<Navigation />
			<Grid container>
				<Grid item xs={2} style={{ overflow: 'auto', height: '92vh' }}>
					<BlockTarget target="sidebar">
						{blocks?.map((group) => {
							return group.courses?.length ? (
								<div
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
									{group.courses.map((el) => {
										if (el.state) return <Block data={el} row={-1} col={-1} />;
									})}
								</div>
							) : null;
						})}
					</BlockTarget>
				</Grid>
				<Grid item xs={10}>
					<Table />
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
