import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';

class Principal extends Component {

    constructor(props){
        super(props);
        this.state = {
            simulados: [],
        }
    }

    novo = () => {
        this.props.history.push("/questao");
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.novo}>Novo</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Título</TableCell>
                                            <TableCell align="right">Opções</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(Principal);