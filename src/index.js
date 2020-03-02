import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Questao from './pages/Questao';
import Logout from './components/Logout';

function autenticado() {
    return localStorage.getItem('token') === null;
}

function login() {
    return <Redirect to="/?msg=Você precisa estar logado" />;
}

ReactDOM.render(
    <BrowserRouter >
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/principal" render={() => (
                autenticado() ?
                    (
                        login()
                    ) :
                    (
                        <Principal />
                    )
            )} />
            <Route path="/questao" render={() => (
                autenticado() ?
                    (
                        login()
                    ) :
                    (
                        <Questao />
                    )
            )} />

            <Route path="/questao/:uuid" render={() => (
                autenticado() ?
                    (
                        login()
                    ) :
                    (
                        <Questao />
                    )
            )} />

            <Route path="/logout" component={Logout} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
