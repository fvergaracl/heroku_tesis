
export const iniciardesafio = async (iddesafio) => {
    let payload = {
        "iddesafio": iddesafio,
        "inicio": -1,
        "pretest": -1,
        "test": -1,
        "postest": -1
    }
    let estados = []
    try {
        if (JSON.parse(localStorage.getItem('estados')) === null){
            estados = []
        } else {
            estados = JSON.parse(localStorage.getItem('estados'))
        }
    } catch (error) {
        estados = []
    }
    let esta_en_estados = false
    estados.forEach(element => {
        if (element['iddesafio'] === iddesafio){
            esta_en_estados = true
        }
    });
    if (!(esta_en_estados)){
        estados.push(payload)
        localStorage.setItem('estados', JSON.stringify(estados))
    }
    
} 


export const get_estado_desafio = (iddesafio) => {
    if (JSON.parse(localStorage.getItem('estados')) === undefined) {
        return []
      }
    else {
        let desafios_ = JSON.parse(localStorage.getItem('estados'))
        if (!(desafios_ === null)){
            for (let i = 0; i < desafios_.length; i++) {
                if (String(desafios_[i]['iddesafio']) === String(iddesafio)){
                    return desafios_[i]
                }
            }
        }
        
    }
    return null
}

export const cambiar_estado_desafio = (iddesafio,etapa,valor) => {
    if (JSON.parse(localStorage.getItem('estados')) === undefined) {
        //
    }
    else {
        let desafios_ = JSON.parse(localStorage.getItem('estados'))
        for (let i = 0; i < desafios_.length; i++) {
            console.log(String(desafios_[i]['iddesafio']))
            console.log(iddesafio)
            if (String(desafios_[i]['iddesafio']) === String(iddesafio)){
                if (etapa === 'inicio'){
                    desafios_[i]['inicio'] = valor
                } else if (etapa === 'pretest'){
                    desafios_[i]['pretest'] = valor
                } else if (etapa === 'test'){
                    desafios_[i]['test'] = valor
                } else if (etapa === 'postest'){
                    desafios_[i]['postest'] = valor
                }
                
            }
        }
        localStorage.setItem('estados', JSON.stringify(desafios_))
        return get_estado_desafio(iddesafio)
    }
}


export const checkear_ultima_pagina = () => {
    let token = localStorage.getItem('token')
    let ultimaPagina = localStorage.getItem('ultimaPagina')
    if (!(token === null)){
      if (!(ultimaPagina === null)){
        window.location.href = ultimaPagina
      } else {
        window.location.href = '/panel'
      }
    }
}