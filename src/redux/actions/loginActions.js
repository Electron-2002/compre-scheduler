import backend from '../../backend';
import { SET_LOGIN } from '../reducers/loginReducers';
import { setLoading } from './loadActions';

export const handleLogin = (loginForm) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		let loginData = await backend.post('/user/login', new URLSearchParams(loginForm));
		let isLogin = true;
		sessionStorage.setItem('isLogin', true);
		sessionStorage.setItem('userId', loginData.data.user[0].id);
		await dispatch({ type: SET_LOGIN, payload: { isLogin, loginData: loginData.data.user[0] } });
		window.location.href = '/';
	} catch (err) {
		console.log(err);
	}
	dispatch(setLoading(false));
};
