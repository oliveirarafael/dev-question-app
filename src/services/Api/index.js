const URL_BASE = 'http://localhost:8080/api/v1';

const endpoint = (resource, requestInfo) =>{
    return fetch(`${URL_BASE}/${resource}`, requestInfo)
}

const Api = {
   
    login: (email, senha) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
            headers: new Headers({
                'Content-type': 'application/json',
            })
        };
        return endpoint('auth', requestInfo);
    },

    questoes: () => {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };
        return endpoint('questoes', requestInfo);
    },

    cadastrarQuestao: (titulo, descricao, respostas) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ titulo, descricao, respostas }),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };
        return endpoint('questoes', requestInfo);
    },

    deletarQuestao: (uuid) => {
        const requestInfo = {
            method: 'DELETE',
           
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            })
        };
        return endpoint(`questoes/${uuid}`, requestInfo);
    }
}

export default Api;