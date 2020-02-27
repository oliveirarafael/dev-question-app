import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () =>
    <AppBar position="static" style={{ marginBottom: 80 }}>
        <Toolbar>
            <Typography variant="h6">Quest Developer</Typography>
            <Button color="inherit" startIcon={<ExitToAppIcon />} >Sair</Button>
        </Toolbar>
    </AppBar>

export default Header;