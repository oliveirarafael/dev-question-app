import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const Navegacao = () =>
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/principal" >
            Principal
        </Link>
        <Typography color="textPrimary">Questão</Typography>
    </Breadcrumbs>

export default Navegacao;