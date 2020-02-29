
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import queryString from 'query-string';
import Api from '../../services/Api';
import './styles.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mensagem: queryString.parse(this.props.location.search).msg,
            email: null,
            senha: null,
        }
    }

    login = (event) => {
        event.preventDefault();
        const { email, senha } = this.state;

        if ((email === '' || email === null) || (senha === '' || senha === null)) {
            this.setState({ mensagem: 'Informe o email e senha' });
            return;
        }

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ email: email, senha: senha }),
            headers: new Headers({
                'Content-type': 'application/json',
            })
        };

        fetch('http://localhost:8080/api/v1/auth', requestInfo).
            then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        localStorage.setItem("token", result.token)
                        this.props.history.push("/principal");
                    });
                } else {
                    response.json().then(result => {
                        this.setState({ mensagem: result.mensagem })
                    })
                }
            }).
            catch(erro => console.error(erro))
    }

    alert = () => {
        const { mensagem } = this.state;
        if (mensagem !== undefined) {
            return <Alert variant="filled" severity="error">
                {this.state.mensagem}
            </Alert>
        }

        return;
    }

    render() {
        return (
            <div className="fundo">
                <div>
                    <div className="esquerdo">
                       
                    </div>
                    <div className="direito">
                        <Grid container
                            direction="column"
                            alignContent="center"
                            spacing={2}>
                            <Grid item xs={12}>

                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="email"
                                    label="E-mail"
                                    onChange={(event) => this.state.email = event.target.value} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="senha"
                                    type="password"
                                    label="Senha"
                                    onChange={(event) => this.state.senha = event.target.value} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={this.login}>Entrar</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {this.alert()}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}