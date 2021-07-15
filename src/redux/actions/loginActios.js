import backend from '../../backend';
import { SET_LOGIN } from '../reducers/loginReducers';

export const handleLogin = (loginForm) => async (dispatch, getState) => {
	try {
		let loginData = await backend.post('/login', new URLSearchParams(loginForm));
		let isLogin = true;
		dispatch({ type: SET_LOGIN, payload: { isLogin, loginData } });
	} catch (err) {
		console.log(err);
	}
};
