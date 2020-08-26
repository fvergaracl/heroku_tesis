import React from 'react'
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap'
import Pagination from 'pagination-react-hooks';
import { confirmAlert } from 'react-confirm-alert'; 
import $ from 'jquery'

import {  render_pag, reg_accion} from './../../helpers/rest'
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './serps.css'

export default class SerpsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          detalle: undefined,
          serps: [undefined],
          max_popularidad: -1,
          activePage: 4,
          tipo_usuario: 'a',
          render_dummy: true
        }
        this.abrir_url = this.abrir_url.bind(this)
        this.guardar_snippet = this.guardar_snippet.bind(this)
      }
      

      componentDidMount(){

      
       let token = localStorage.getItem('token')
       let data_usuario = token.split('.')[1]
       let tipo_usuario_ = JSON.parse(atob(data_usuario))['seed']
        this.setState({
          detalle:this.props.detalle,
          serps:this.props.serps,
          max_popularidad:this.props.max_popularidad,
          tipo_usuario: tipo_usuario_
        })
        let pagg = '/serps/' + this.props.detalle['iddesafio']
        render_pag(pagg)
      }

      toggle(e) {
        let event = e.target.dataset.event;
        let pag = '/serps/' + this.state.detalle['iddesafio']
        if (this.state.collapse === undefined || this.state.collapse === 0){
          reg_accion(this.state.detalle['iddesafio'],'click_ABRIR_ver_desafio',null,pag)
        } else {
          reg_accion(this.state.detalle['iddesafio'],'click_CERRAR_ver_desafio',null,pag)
        }
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
      }

      handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
      }

      confirmarboton= (event)=>{
        let pag = '/serps/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_confirmar_serp_finalizar',null,pag)
        this.props.cambiar_estado(1)
      }

      cancelarboton= (event)=>{
        let pag = '/serps/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_cancelar_serp_finalizar',null,pag)
      }

      finalizar_boton = () => {
        let pag = '/serps/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_serp_finalizar',null,pag)
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Finalizar desafío</h1>
                  <p>¿Deseas finalizar este desafío?</p>
                  <button className="noo" onClick={()=>{this.cancelarboton();onClose()}}>No</button>
                  <button
                    className="sii"
                    onClick={() => {
                      this.confirmarboton();
                      onClose();
                    }}
                  >
                    Si, Finalizar
                  </button>
                </div>
              );
            }
          });
      };

      render_popularidad_texto(popularidad,max_popularidad){
        if (popularidad === -1){
          return (
            <p>No se registran usos</p>
          )
        } else if (popularidad === 0){
          return(
            <p>Este documento ha sido utilizado por 0% de los usuarios</p>
          )
        } else {
          let porcentaje = (popularidad/max_popularidad)*100
          return(
          <p>Este documento ha sido utilizado por {parseInt(porcentaje, 10)}% de los usuarios</p>
          )
        }
      }

      render_popularidad_row(value){
        if (this.state.tipo_usuario === 'a'){
          return (
            <span><small ><strong>Popularidad: </strong></small><progress max={this.state.max_popularidad}  value={value.popularidad} style={{verticalAlign: 'bottom'}}></progress>  {this.render_popularidad_texto(value.popularidad,this.state.max_popularidad)}</span>
          )
        } else if (this.state.tipo_usuario === 'b'){
          return(
            <span><small ><strong>Popularidad: </strong></small><progress max={this.state.max_popularidad}  value={value.rand_popularidad} style={{verticalAlign: 'bottom'}}></progress>  {this.render_popularidad_texto(value.rand_popularidad,this.state.max_popularidad)}</span>
          )
        } else {
          return(
            <span></span>
          )
        }
      }

      render_botones_guardado(id_serp, url){
        let desafios_local = localStorage.getItem('desafios')
        let desafios = []
        if (!(desafios_local === null)){
          desafios = desafios_local.split`,`.map(x=>+x)
        }
        if (desafios.includes(id_serp)) {
          return (
            <button id={`guardar_btn_${id_serp}`} onClick={()=>{this.guardar_snippet(id_serp,url,`guardar_btn_${id_serp}`)}}  type="button" className="btn bg-warning fs-it-btn">
            <i className="fa fa-minus" aria-hidden="true"></i>
            <span className="fs-it-btn-vertical-line"></span>
            Guardado
            </button>
          )
        } else {
          return (
            <button id={`guardar_btn_${id_serp}`} onClick={()=>{this.guardar_snippet(id_serp,url,`guardar_btn_${id_serp}`)}}  type="button" className="btn bg-blue fs-it-btn">
            <i className="fa fa-plus" aria-hidden="true"></i>
            <span className="fs-it-btn-vertical-line"></span>
            Guardar
            </button>
          )
        }
      }

      render_serps(){
       
      
        const show = (value) => (
          
            <div className="row">
              
              <p className="col-12 urlserp unselectable" >{value.url}</p>
              {this.render_popularidad_row(value)}
              <a href="# " onClick={()=>{this.abrir_url(value.url,value.id_resultado)}} className="col-12" style={{paddingLeft: 0}}> <h3 className="tituloserp">{value.titulo}</h3></a>
                    <br></br>
                    <p className="descripcionserp col-10"> {value.snippet}</p>
                    <p className="col-2" style={{verticalAlign:'top'}}> 
                    {this.render_botones_guardado(value.id_resultado)}
                    </p>
                    <hr className="col-12"></hr>
            </div>
        )
        return(
          <Pagination
              data={this.state.serps}
              Show={show}
              displayNumber="10"
              previousText="Anterior"
              nextText="Siguiente"
          />
        )
      }

      abrir_url =(url,id_serp) =>{
        reg_accion(this.state.detalle['iddesafio'],'click_ABRIR_pagina',id_serp,url)     
        window.open(url, '_blank');
     }

     guardar_snippet =(id_snippet,url,id_boton) =>{
       let desafios_local = localStorage.getItem('desafios')
       let desafios = []
       if (!(desafios_local === null)){
         desafios = desafios_local.split`,`.map(x=>+x)
       }
       if (document.getElementById(id_boton).className === 'btn bg-blue fs-it-btn'){
        desafios.push(id_snippet)
        reg_accion(this.state.detalle['iddesafio'],'guardar',id_snippet,url)
        document.getElementById(id_boton).className= 'btn bg-warning fs-it-btn'
        document.getElementById(id_boton).innerHTML= '<i class="fa fa-minus" aria-hidden="true"></i><span class="fs-it-btn-vertical-line"></span>Guardado'
       } else{
        let index = desafios.indexOf(id_snippet);
        desafios.splice(index, 1);
        reg_accion(this.state.detalle['iddesafio'],'NOguardar',id_snippet,url)
        document.getElementById(id_boton).className= 'btn bg-blue fs-it-btn'
       document.getElementById(id_boton).innerHTML= '<i class="fa fa-plus" aria-hidden="true"></i><span class="fs-it-btn-vertical-line"></span>Guardar'
       }
       localStorage.setItem('desafios', desafios)
       this.setState({
        render_dummy:true
      })
       
   }


      render() {
        
        if (!(this.state.detalle === undefined )){
          const {collapse} = this.state;
          return(
              <>
              <div className="container">
              <Card style={{ marginBottom: '1rem' }} key={1}>
                    <CardHeader className="col-12 text-center" ><button className="btn btn-lg btn-success" onClick={this.toggle} data-event={1}>Ver desafío</button></CardHeader>
                    <Collapse isOpen={collapse === 1}>
                    <CardBody>
                    <p><strong>Título:</strong>{this.state.detalle['titulo']}</p>
                    <p><strong>Descripción:</strong>{this.state.detalle['descripcion']}</p>
                    <hr></hr>
                    <p style={{fontSize: '1.3em'}}><strong>Objetivos:</strong>{this.state.detalle['objetivos']}</p>
                    </CardBody>
                    </Collapse>
                </Card>
                {this.render_serps()}
                <div className="col-12 text-center">
                <br></br>
                <br></br>
                  <button className="btn btn-lg btn-success" onClick={()=>{this.finalizar_boton()}}> Finalizar desafío</button>
                </div>
              </div>
              
              </>
          )
        } else {
          return(<></>)
        }
    }

}