import React, { Component } from "react";
import Header from "../../components/Header";
import {
    Container,
    Grid,
    TextField,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    FormControlLabel,
    Switch,
    Button,
    IconButton,
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Navegacao from "../../components/Navegacao";
import { withRouter } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class Questao extends Component {
    LIMITE_RESPOSTAS = 4;


    constructor(props) {
        super(props);

        this.state = {
            respostaCorreta: false,
            respostaCorretaAdicionada: false,
            resposta: {},
            descricaoResposta: null,
            descricaoQuestao: null,
            tituloQuestao: null,
            respostas: [],
            quantidadeResposta: 0,
            open: false,
            mensagensValidacao: [],
            alertas: [],
        }
    }

    adicionaResposta = (event) => {
        event.preventDefault();
        let { resposta, respostaCorreta, respostas, descricaoResposta, quantidadeResposta } = this.state;

        if (descricaoResposta === null || descricaoResposta === '') {
            this.setState({
                open: true
            })

            return;
        }

        this.respostaCorretaAdicionada(respostaCorreta);

        resposta = {
            key: quantidadeResposta,
            descricao: descricaoResposta,
            respostaCorreta: respostaCorreta,
        }

        respostas.push(resposta);
        quantidadeResposta++;

        this.setState({
            respostas,
            quantidadeResposta
        });

        this.limparCamposResposta();

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false
        })
    };

    respostaCorretaAdicionada = (respostaCorreta) => {
        if (respostaCorreta) {
            this.setState({
                respostaCorretaAdicionada: respostaCorreta,
            })
        }
    }

    limparCamposResposta = () => {
        this.setState({
            respostaCorreta: false,
            descricaoResposta: '',
        });
    }

    voltar = () => {
        this.props.history.push('/principal')
    }

    excluirResposta = (index) => {
        let { quantidadeResposta, respostas } = this.state;

        quantidadeResposta--;

        this.setState({
            respostas: respostas.filter((resposta, posAtual) => {
                return posAtual != index;
            }),
            quantidadeResposta: quantidadeResposta,
        });
    }

    salvar = () => {
        const { tituloQuestao, descricaoQuestao, respostas } = this.state;

        if (this.questaoValida(tituloQuestao, descricaoQuestao, respostas)) {
            this.setState({
                alertas: [],
            })

        } else {
            this.alertaValidacao();
            this.limparMensagensValidacao();
        }
    }

    limparMensagensValidacao = () => {
        this.setState({
            mensagensValidacao: [],
        })
    }

    questaoValida = (tituloQuestao, descricaoQuestao, respostas) => {
        let { mensagensValidacao } = this.state;

        if (tituloQuestao === null || tituloQuestao === '') {
            mensagensValidacao.push('O título da questão e obrigatório');
        }

        if (descricaoQuestao === null || descricaoQuestao === '') {
            mensagensValidacao.push('O descrição da questão e obrigatório');
        }

        if (respostas.length < 2) {
            mensagensValidacao.push('Precisa incluir no minimo 2 respostas');
        }

        let respostaCorretaEncontrada = respostas.filter(r => {return r.respostaCorreta === true})

        if(respostaCorretaEncontrada.length === 0){
            mensagensValidacao.push('Precisa incluir no minimo 1 resposta correta');
        }

        this.setState({
            mensagensValidacao: mensagensValidacao
        });

        return mensagensValidacao.length == 0;
    }

    alertaValidacao = () => {
        const { mensagensValidacao } = this.state;
        let alertas = [];
        if (mensagensValidacao.length !== 0) {
            mensagensValidacao.forEach(function (mensagem, index) {
                alertas.push(
                    <Alert key={index} variant="filled" severity="error" style={{ marginBottom: 10 }}>{mensagem}</Alert>
                )
            });

            this.setState({
                alertas: alertas,
            })
        } else {
            this.setState({
                alertas: [],
            })
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} variant="filled" severity="error">
                                    Informe a descrição da Resposta
                                </Alert>
                            </Snackbar>
                            {
                                this.state.alertas
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Navegacao />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Questão
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="titulo"
                                fullWidth={true}
                                label="Título"
                                required={true}
                                value={this.state.tituloQuestao}
                                onChange={(event) => {
                                    this.setState({
                                        tituloQuestao: event.target.value
                                    });
                                }} />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="descricao-questao"
                                fullWidth={true}
                                label="Descrição"
                                required={true}
                                multiline={true}
                                value={this.state.descricaoQuestao}
                                onChange={(event) => {
                                    this.setState({
                                        descricaoQuestao: event.target.value
                                    });
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Respostas
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="descricao-resposta"
                                fullWidth={true}
                                label="Descrição"
                                multiline={true}
                                onChange={(event) => {
                                    this.setState({
                                        descricaoResposta: event.target.value
                                    });
                                }}
                                value={this.state.descricaoResposta} />
                        </Grid>
                        <Grid item xs={2} style={{ paddingTop: 25, paddingLeft: 25 }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={this.state.respostaCorreta} disabled={this.state.respostaCorretaAdicionada} onChange={(event) => {
                                        this.setState({
                                            respostaCorreta: event.target.checked
                                        });
                                    }} value={true} color="primary" />
                                }
                                label="Correta"
                            />
                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: 25 }}>
                            <Button variant="contained"
                                color="primary"
                                endIcon={<AddIcon />}
                                disabled={this.LIMITE_RESPOSTAS === this.state.quantidadeResposta}
                                onClick={this.adicionaResposta}>Adicionar</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Correta?</TableCell>
                                            <TableCell align="right">Excluir</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.respostas.map((resposta, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {resposta.descricao}
                                                </TableCell>
                                                <TableCell>
                                                    {resposta.respostaCorreta ? "Sim" : "Não"}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" onClick={() => this.excluirResposta(index)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justify="flex-end" style={{ marginTop: 50 }}>
                        <Grid item xs={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.voltar}>Voltar</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" onClick={this.salvar}>Salvar</Button>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default withRouter(Questao);