import React from 'react';
import './panelgeneral.css'
import {REST_get_all_desafios, dominio, render_pag, reg_accion} from './../helpers/rest'
import { iniciardesafio, get_estado_desafio } from './../helpers/local'

export default class PanelGeneralScreen extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			desafios: []
		}

	}

	salir_de_cuenta(){
		reg_accion(null,'click_cerrar_sesion_clear_token',null,'panel')
		localStorage.clear()
		window.location.href = '/'
	}

	async componentDidMount(){
		render_pag('/panel')
		if (!(JSON.parse(localStorage.getItem('estados')) === null)){
		}
		let desafios_ = await REST_get_all_desafios()
		this.setState({
			desafios: desafios_
		})
	}

	iniciar_desafio(iddesafio){
		reg_accion(iddesafio,'click_iniciar_desafio',null,'panel')
		iniciardesafio(iddesafio)
		window.location.href = `desafio/${iddesafio}`
	}

	obtener_todos_los_desafios(){
		if (!(this.state.desafios['desafios']=== undefined)){
			let response__ = this.state.desafios['desafios'].map((item, index)=>{
				let estado_desafio = get_estado_desafio(item['iddesafio'])
				let boton = <></>
				if (estado_desafio == null){
					boton = <a href="# " onClick={()=>{this.iniciar_desafio(item['iddesafio'])}} className="btn btn-success">Iniciar desafío</a>
				}else if (String(estado_desafio['inicio']) === '-1'){
					boton = <a href="# "  onClick={()=>{this.iniciar_desafio(item['iddesafio'])}} className="btn btn-success">Iniciar desafío</a>
				} else if (String(estado_desafio['pretest']) === '-1'){
					boton = <a href="# "  onClick={()=>{this.iniciar_desafio(item['iddesafio'])}} className="btn btn-warning">Continuar Pre-test</a>
				} else if (String(estado_desafio['test']) === '-1'){
					boton = <a href="# "  onClick={()=>{this.iniciar_desafio(item['iddesafio'])}} className="btn btn-warning">Continuar Test</a>
				} else if (String(estado_desafio['postest']) === '-1'){
					boton = <a href="# "  onClick={()=>{this.iniciar_desafio(item['iddesafio'])}} className="btn btn-warning">Continuar Post-test</a>
				} else if (String(estado_desafio['postest']) === '1'){
					boton = <a href="# "  className="btn btn-light disabled" disabled={false}>Finalizado</a>
				}
				return(
					<div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 p-2 card">
						<div className="thumbnail">
							<div className="col-xl-1" style={{position:'absolute'}}>
								<h1 style={{backgroundColor: 'rgb(255,255,255,0.6)', width: '70px', border: '3px solid red'}}>{index+1}</h1>
							</div>
							<img src={`${dominio}/static/${item['imagen']}`}></img>
							<div className="caption">
								<div className="f-prime sml primes">
									{item['titulo']}
								</div>
								<div className="f-third text-light">
								<strong>Objetivo</strong>: {item['objetivos']}
								</div>
								<hr></hr>
								<p>
								<strong>Descripción</strong>: {item['descripcion']}
								</p>
								<div className="mb-0">
									{boton}
								</div>
							</div>
						</div>
					</div>
				)
			  })
			  return response__
		} else return ''
	}

	render(){
		return (
			<>
			<div className="row p-0" id="gradient-header">
		
				<div className="col-10" >
				</div>
				<div className="col-2">
					<button href="# " className="btn btn-danger" style={{marginTop:'40px'}} onClick={()=>{this.salir_de_cuenta()}}>Cerrar sesión</button>
				</div>
		
				<div className="col-12 text-center mx-auto p-2">
				  <div className="f-prime large thirds">
						Desafíos
				  </div>
				  <div className="f-second text-light">
						Responder de izquierda a derecha 
					   
				  </div>
				</div>
			</div>
			<div className="row bg-dark p-0">
				<div className="col-12 mx-auto p-0">
					<div className="row mx-auto p-2">
						{this.obtener_todos_los_desafios()}
						
					</div>
				</div>
			</div>
		
			</>
		  );
	}
}




