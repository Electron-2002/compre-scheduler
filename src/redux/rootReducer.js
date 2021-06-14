import { combineReducers } from 'redux';
import tableReducer from './reducers/tableReducer';

const rootReducer = combineReducers({
	table: tableReducer,
});

export default rootReducer;
