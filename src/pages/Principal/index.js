import React, { Component } from 'react';
import { Container, IconButton } from '@material-ui/core';
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
import Api from '../../services/Api';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questoes: [],
        }
    }

    novo = () => {
        this.props.history.push("/questao");
    }

    componentDidMount() {
        this.carregar();
    }

    carregar = () => {
        Api.questoes().then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({
                        questoes: json.content,
                    })
                })
            }
        })
    }

    atualizar = (uuid) => {
        this.props.history.push(`/questao/${uuid}`)
    }

    excluir = (uuid) => {
        Api.deletarQuestao(uuid).then(response => {
           this.carregar();
        }).catch(erro => console.error)
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
                                        {this.state.questoes.map((questao, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {questao.titulo}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="update">
                                                        <UpdateIcon fontSize="small" onClick={() => this.atualizar(questao.uuid)}/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete">
                                                        <DeleteIcon 
                                                           fontSize="small" 
                                                           onClick={() => this.excluir(questao.uuid)}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
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