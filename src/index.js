import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<Router>
				<App />
			</Router>
		</DndProvider>
	</Provider>,
	document.getElementById('root')
);
