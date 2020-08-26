import React from 'react'

import {get_desafio_por_id} from './../../helpers/rest'
import {get_estado_desafio, cambiar_estado_desafio} from './../../helpers/local'

import InicioDesafioScreen from './iniciodesafio'
import PretestScreen from './pretest'
import SerpsScreen from './serps'
import PostestScreen from './postest'
import FinalDesafioScreen from './finaldesafio'

export default class DesafioScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            data: null,
            estadodesafio: null,

        }
        this.cambiar_inicio = this.cambiar_inicio.bind(this)
        
    }
    
    async componentDidMount(){
        
        let estado_desafio =  await get_estado_desafio(this.props.match.params.id)
        let data_ = await get_desafio_por_id(this.props.match.params.id) 
        this.setState({
            data: data_,
            estadodesafio: estado_desafio
        })
    }

    cambiar_inicio =(valor) =>{
        let estado_desafio_ = cambiar_estado_desafio(this.props.match.params.id,'inicio',valor)
        this.setState({
            estadodesafio: estado_desafio_
        })
     }

     cambiar_pretest =(valor) =>{
        let estado_desafio_ = cambiar_estado_desafio(this.props.match.params.id,'pretest',valor)
        this.setState({
            estadodesafio: estado_desafio_
        })
     }

     cambiar_test =(valor) =>{
        let estado_desafio_ = cambiar_estado_desafio(this.props.match.params.id,'test',valor)
        this.setState({
            estadodesafio: estado_desafio_
        })
     }

     cambiar_postest =(valor) =>{
        let estado_desafio_ = cambiar_estado_desafio(this.props.match.params.id,'postest',valor)
        this.setState({
            estadodesafio: estado_desafio_
        })
     }

    render(){
        let estadodesafio = this.state.estadodesafio
        let vieww = <></>
        if (estadodesafio === null){
            vieww = <></>
        } else if (String(estadodesafio['inicio']) === '-1' || String(estadodesafio['inicio']) === '0'){
            vieww = <InicioDesafioScreen detalle={this.state.data['desafio']}  cambiar_estado={this.cambiar_inicio} />
        } else if (String(estadodesafio['pretest']) === '-1' || String(estadodesafio['pretest']) === '0'){
            vieww = <PretestScreen detalle={this.state.data['desafio']} cuestionario={this.state.data['pretest']} cambiar_estado={this.cambiar_pretest}  />
        } else if (String(estadodesafio['test']) === '-1' || String(estadodesafio['test']) === '0'){
            vieww = <SerpsScreen detalle={this.state.data['desafio']} serps={this.state.data['serps']} max_popularidad={this.state.data['max_popularidad']} cambiar_estado={this.cambiar_test}/>
        } else if (String(estadodesafio['postest']) === '-1' || String(estadodesafio['postest']) === '0'){
            vieww = <PostestScreen detalle={this.state.data['desafio']} cuestionario={this.state.data['postest']}  cambiar_estado={this.cambiar_postest}  />
        } else {
            vieww = <FinalDesafioScreen detalle={this.state.data['desafio']} serps={this.state.data['serps']} max_popularidad={this.state.data['max_popularidad']} cambiar_estado={this.cambiar_test}/>
        }
        if (!(this.state.data === null)){
            if (!(this.state.data === null)){
                return(
                    vieww
                )
            }
            else {
                return (
                    <>
                    </>
                )
            }
        } else {
            return (
                <>
                </>
            )
        }
    }

}