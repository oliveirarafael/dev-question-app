const URL_BASE = 'http://localhost:8080/api/v1/';

const endpoint = (resource, requestInfo) =>{
    return fetch(`${URL_BASE}/${resource}`, requestInfo).then(response => response.json())
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
    }
}

export default Api;