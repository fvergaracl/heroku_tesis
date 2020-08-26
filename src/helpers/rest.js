export const dominio = 'https://fvergara.cl:5001'

export const login = async (usuario,contrasena) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*' },
        body: JSON.stringify({ 
            user: usuario, 
            pass: contrasena
        })
    };
    let response = await fetch(`${dominio}/login`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}

export const reg_accion = async (desafio = null, accion = null, id_serp = null, route_pag = null) => {
    let token = await localStorage.getItem('token')
    console.log(token)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'JWT '+ token 
        },
        body: JSON.stringify({ 
            ruta: route_pag,
            accion: accion,
            idserp: id_serp,
            iddesafio: desafio
        })
    };
    let response = await fetch(`${dominio}/accion`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}


export const reg_accion_test = async (idtest_ = null, valortest_ = null, estado_ = null, iddesafio_ = null,tipotest_ =null) => {
    let token = await localStorage.getItem('token')
    console.log(token)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'JWT '+ token 
        },
        body: JSON.stringify({ 
            idtest: idtest_,
            valortest: valortest_,
            estado: estado_,
            iddesafio: iddesafio_,
            tipotest: tipotest_
        })
    };
    let response = await fetch(`${dominio}/accion_test`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}


export const render_pag = async (route_pag) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'JWT '+ localStorage.getItem('token') },
        body: JSON.stringify({ 
            route: route_pag
        })
    };
    let response = await fetch(`${dominio}/render_pag`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}



export const REST_get_all_desafios = async () => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'JWT '+ localStorage.getItem('token')}
    };
    let response = await fetch(`${dominio}/desafios`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}


export const get_desafio_por_id = async (id_desafio) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'JWT '+ localStorage.getItem('token')}
    };
    let response = await fetch(`${dominio}/desafio/${id_desafio}`, requestOptions)
        .then((response) => {
            return response.json()
        });
    return response
}