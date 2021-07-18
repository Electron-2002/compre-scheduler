import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../redux/actions/tableActions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
	},
}));

export default function MenuAppBar(props) {
	const { showSave, showExport } = props;

	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const history = useHistory();
	const dispatch = useDispatch();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const exportHandler = () => {
		history.push('/exports');
	};

	const saveHandler = () => {
		dispatch(updateSchedule());
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{showSave && (
						<Button style={{ color: 'white' }} onClick={saveHandler}>
							SAVE
						</Button>
					)}
					{showExport && (
						<Button style={{ color: 'white' }} onClick={exportHandler}>
							EXPORT
						</Button>
					)}
					<Typography variant="h6" className={classes.title}>
						COMPRE SCHEDULER
					</Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem
								onClick={() => {
									sessionStorage.removeItem('isLogin');
									window.location.reload();
								}}
							>
								Log out
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
