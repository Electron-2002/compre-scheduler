export const SET_LOGIN = 'SET_LOGIN';

const initialState = {
	isLogin: false,
	loginData: {},
};

const loginReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOGIN:
			return {
				...state,
				isLogin: payload.isLogin,
				loginData: payload.loginData,
			};
		default:
			return state;
	}
};

export default loginReducer;
