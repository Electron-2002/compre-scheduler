import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import backend from '../backend';
import loginBanner from '../Images/loginBanner.svg';

export const Login = () => {
	const [loginForm, setLoginForm] = useState({});

	const handleChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
		console.log(loginForm);
	};
	const handleLogin = async (e) => {
		try {
			let response = await backend.post('/login', new URLSearchParams(loginForm));
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Grid container justify="space-evenly" className="login-container">
			<Grid item md={4}>
				<img src={loginBanner} alt="login" style={{ width: '100%' }} />
			</Grid>
			<Grid container direction="column" item md={4} className="login-form">
				<form noValidate autoComplete="off">
					<Grid item>
						<TextField
							label="Username"
							variant="outlined"
							style={{ margin: '1rem' }}
							className="loginInput"
							onChange={handleChange}
							name="email"
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
						/>
					</Grid>
					<Button
						variant="contained"
						size="large"
						color="primary"
						onClick={handleLogin}
						style={{ margin: '1rem' }}
					>
						Login
					</Button>
				</form>
			</Grid>
		</Grid>
	);
};
