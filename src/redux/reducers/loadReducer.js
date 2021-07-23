export const SET_LOADING = 'SET_LOADING';

const initialState = {
	isLoading: false,
};

const tableReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		default:
			return state;
	}
};

export default tableReducer;
