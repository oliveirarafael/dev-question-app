import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    
    constructor(props){
        super(props);
    }
    
    sair = () => {
        this.props.history.push('/logout')
    }
    
    render() {
        return (
            <AppBar position="static" style={{ marginBottom: 80 }}>
                <Toolbar>
                    <Typography variant="h6">Quest Developer</Typography>
                    <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={this.sair}>Sair</Button>
                </Toolbar>
            </AppBar>
        );
    }
}    

export default withRouter(Header);