import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.css';

const Loading = () => {
	return (
		<div className="loading">
			<CircularProgress />
		</div>
	);
};

export default Loading;
