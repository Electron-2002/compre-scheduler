import backend from '../../backend';
import { SET_LOGIN } from '../reducers/loginReducers';

export const handleLogin = (loginForm) => async (dispatch) => {
	try {
		let loginData = await backend.post('/user/login', new URLSearchParams(loginForm));
		let isLogin = true;
		dispatch({ type: SET_LOGIN, payload: { isLogin, loginData: loginData.data.user[0] } });
	} catch (err) {
		console.log(err);
	}
};
