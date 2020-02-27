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
            correta: false,
            resposta: {},
            respostas: [],
            quantidadeResposta: 0,
        }
    }

    handleCorreta = (event) => {
        this.setState({
            correta: event.target.checked
        });
    }

    adicionaResposta = (event) => {
        const { respostas, resposta, correta, quantidadeResposta } = this.state;
        resposta = {
            descricao: this.descricaoResposta.value,
            correta: correta,
        }

        respostas.append(resposta);

        quantidadeResposta++;
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
                            <TextField id="titulo" fullWidth={true} label="Título" ref={(input) => this.titulo = input} />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="descricao-questao" fullWidth={true} label="Descrição" multiline={true} ref={(input) => this.descricaoQuestao = input} />
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
                                ref={(input) => this.descricaoResposta = input} />
                        </Grid>
                        <Grid item xs={2.5} style={{ paddingTop: 25, paddingLeft: 25 }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={this.state.correta} onChange={this.handleCorreta} value={true} color="primary" />
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
                                            <TableRow key={resposta}>
                                                <TableCell component="th" scope="row">
                                                    {resposta.descricao}
                                                </TableCell>
                                                <TableCell align="right">{resposta}</TableCell>
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