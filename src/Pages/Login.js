import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading/Loading';
import loginBanner from '../Images/loginBanner.svg';
import { handleLogin } from '../redux/actions/loginActions';

export const Login = () => {
	const [loginForm, setLoginForm] = useState({});

	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.load.isLoading);

	const handleChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	};

	return (
		<Grid container justify="space-evenly" className="login-container">
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Grid item md={4}>
						<img src={loginBanner} alt="login" style={{ width: '100%' }} />
					</Grid>
					<Grid container direction="column" item md={4} className="login-form">
						<form
							autoComplete="off"
							onSubmit={(e) => {
								e.preventDefault();
								dispatch(handleLogin(loginForm));
							}}
						>
							<Grid item>
								<TextField
									label="Username"
									variant="outlined"
									style={{ margin: '1rem' }}
									className="loginInput"
									onChange={handleChange}
									name="email"
									required
								/>
							</Grid>
							<Grid item>
								<TextField
									id="outlined-password-input"
									label="Password"
									type="password"
									autoComplete="current-password"
									variant="outlined"
									style={{ margin: '1rem' }}
									className="loginInput"
									onChange={handleChange}
									name="password"
									required
								/>
							</Grid>
							<Button
								variant="contained"
								size="large"
								color="primary"
								type="submit"
								style={{ margin: '1rem' }}
							>
								Login
							</Button>
						</form>
					</Grid>
				</>
			)}
		</Grid>
	);
};
