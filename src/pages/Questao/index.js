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
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import Navegacao from "../../components/Navegacao";

export default class Questao extends Component {
    LIMITE_RESPOSTAS = 4;

    constructor(props) {
        super(props);
        this.state = {
            respostaCorreta: false,
            resposta: {},
            descricaoResposta: null,
            descricaoQuestao: null,
            tituloQuestao: null,
            respostas: [],
            quantidadeResposta: 0,
        }
    }

    adicionaResposta = (event) => {
        event.preventDefault();
        let { resposta, respostaCorreta, respostas, descricaoResposta, quantidadeResposta } = this.state;

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

        console.log(respostas);
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Grid container spacing={2}>
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
                                       value={this.state.tituloQuestao} />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="descricao-questao" 
                                       fullWidth={true} 
                                       label="Descrição"                                       
                                       multiline={true} 
                                       value={this.state.descricaoQuestao} />
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
                                    <Switch checked={this.state.respostaCorreta} onChange={(event) => {
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
                                            <TableCell align="right">Opção</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.respostas.map(resposta => (
                                            <TableRow key={resposta.key}>
                                                <TableCell>{resposta.key + 1}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {resposta.descricao}
                                                </TableCell>
                                                <TableCell>{resposta.respostaCorreta ? "Sim" : "Não"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justify="flex-end" style={{marginTop: 50}}>
                        <Grid item xs={1}>
                            <Button variant="outlined"
                                color="primary"
                            >Voltar</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained"
                                color="primary"
                            >Salvar</Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}