
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';

export default class Login extends Component {

    state = {
        mensagem: '',
    }

    login = (event) => {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ login: this.login.value, senha: this.senha.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch('http://localhost:8080/api/v1/auth', requestInfo).
            then(response => {
                if (response.ok) {

                } else {
                    console.log(response);
                    this.setState({
                        mensagem: 'Não foi possível realizar o Login'
                    })
                }
            }).
            then(token => {

            }).catch(erro => {
                console.error(erro);
            })

    }

    render() {
        return (
            <Container>
                <span>{this.state.mensagem}</span>
                <Grid container direction="column" justify="flex-end" alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Login
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" label="E-mail" ref={(input) => this.email = input} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="senha" label="Senha" ref={(input) => this.senha = input} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.login}>Entrar</Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}