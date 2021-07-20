import { SET_LOADING } from '../reducers/loadReducer';

export const setLoading = (isLoading) => (dispatch) => {
	dispatch({ type: SET_LOADING, payload: isLoading });
};
