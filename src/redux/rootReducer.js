import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducers';
import tableReducer from './reducers/tableReducer';
import loadReducer from './reducers/loadReducer';

const rootReducer = combineReducers({
	table: tableReducer,
	login: loginReducer,
	load: loadReducer,
});

export default rootReducer;
