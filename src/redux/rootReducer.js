import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducers';
import tableReducer from './reducers/tableReducer';

const rootReducer = combineReducers({
	table: tableReducer,
	login: loginReducer,
});

export default rootReducer;
