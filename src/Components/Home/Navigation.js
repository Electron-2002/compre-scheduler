import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { logout, updateSchedule } from '../../redux/actions/tableActions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
	},
}));

const StyledMenu = withStyles({
	paper: {
		border: '2px solid #7886CB',
	},
})((props) => (
	<Menu
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		elevation={0}
		keepMounted
		{...props}
	/>
));

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
		dispatch(updateSchedule());
		history.push('/exports');
	};

	const saveHandler = async () => {
		dispatch(updateSchedule());
		window.location.reload();
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
						<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
							<MenuItem onClick={() => history.push('/')}>Home</MenuItem>
							<MenuItem
								onClick={() => {
									dispatch(logout());
								}}
							>
								Log out
							</MenuItem>
						</StyledMenu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
