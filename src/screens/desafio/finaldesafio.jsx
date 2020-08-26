import React from 'react'
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap'
import Pagination from 'pagination-react-hooks';
import { confirmAlert } from 'react-confirm-alert'; 
import $ from 'jquery'

import {  render_pag, reg_accion} from './../../helpers/rest'
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './serps.css'

export default class FinalDesafioScreen extends React.Component {

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
        let pagg = '/final/' + this.props.detalle['iddesafio']
        render_pag(pagg)
      }

      toggle(e) {
        let event = e.target.dataset.event;
        let pag = '/final_desafio/' + this.state.detalle['iddesafio']
        if (this.state.collapse === undefined || this.state.collapse === 0){
          reg_accion(this.state.detalle['iddesafio'],'click_ABRIR_ver_desafio_final',null,pag)
        } else {
          reg_accion(this.state.detalle['iddesafio'],'click_CERRAR_ver_desafio_final',null,pag)
        }
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
      }

      handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
      }

      confirmarboton= (event)=>{
        let pag = '/finaldesafio/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_confirmar_serp_finalizar_final',null,pag)
        window.location = '/panel'
      }

      cancelarboton= (event)=>{
        let pag = '/finaldesafio/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_cancelar_serp_finalizar_final',null,pag)
      }

      finalizar_boton = () => {
        let pag = '/finaldesafio/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_volver_a_panel_inicio_final',null,pag)
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Desafío finalizado</h1>
                  <button className="noo" onClick={()=>{this.cancelarboton();onClose()}}>No</button>
                  <button
                    className="sii"
                    onClick={() => {
                      this.confirmarboton();
                      onClose();
                    }}
                  >
                    Ir al panel
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



      render_snippet(value){
        let desafios_local = localStorage.getItem('desafios')
        let desafios = []
        if (!(desafios_local === null)){
          desafios = desafios_local.split`,`.map(x=>+x)
        }
        if (desafios.includes(value.id_resultado)){
            return (
                <div className="row">
                  
                <p className="col-12 urlserp unselectable" >{value.url}</p>
                {this.render_popularidad_row(value)}
                <a href="# " className="col-12" style={{paddingLeft: 0}}> <h3 className="tituloserp">{value.titulo}</h3></a>
                      <br></br>
                      <p className="descripcionserp col-10"> {value.snippet}</p>
                      <p className="col-2">
            <span><strong>ID SERP: </strong>{value.id_resultado}</span>
                      </p>
                      <hr className="col-12"></hr>
              </div>
              )
        } else {
            return <></>
        }
          
      }

      render_serps(){
       
        console.log('++++++++++')
        const show = (value) => (
            this.render_snippet(value)
            
        )
        return(
          <Pagination
              data={this.state.serps}
              Show={show}
              displayNumber="50"
              previousText="Anterior"
              nextText="Siguiente"
          />
        )
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
                <h1>Estos son los documentos que seleccionaste</h1>
                {this.render_serps()}
                <div className="col-12 text-center">
                <br></br>
                <br></br>
                  <button className="btn btn-lg btn-success" onClick={()=>{this.finalizar_boton()}}> Volver al panel de inicio</button>
                </div>
              </div>
              
              </>
          )
        } else {
          return(<></>)
        }
    }

}