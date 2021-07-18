import backend from '../../backend';
import { SET_LOGIN } from '../reducers/loginReducers';

export const handleLogin = (loginForm) => async (dispatch) => {
	try {
		let loginData = await backend.post('/user/login', new URLSearchParams(loginForm));
		let isLogin = true;
		sessionStorage.setItem('isLogin', true);
		sessionStorage.setItem('userId', loginData.data.user[0].id);
		await dispatch({ type: SET_LOGIN, payload: { isLogin, loginData: loginData.data.user[0] } });
		window.location.reload();
	} catch (err) {
		console.log(err);
	}
};