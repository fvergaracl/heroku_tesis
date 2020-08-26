import React from 'react'
import { dominio, render_pag, reg_accion} from './../../helpers/rest'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './iniciodesafio.css'



  
export default class InicioDesafioScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            detalle: null
        }
        this.cancelarboton = this.cancelarboton.bind(this)
    }
    
    componentDidMount(){


        this.setState({
            detalle: this.props.detalle
        })
    }

    confirmarboton= (event)=>{
        let pag = '/detalles/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_iniciar_desafio_confirmar',null,pag)
        this.props.cambiar_estado(1)
    }

    cancelarboton= (event)=>{
        let pag = '/detalles/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_iniciar_desafio_cancelar',null,pag)
    }

    iniciar_boton = () => {
        let pag = '/detalles/' + this.state.detalle['iddesafio']
        reg_accion(this.state.detalle['iddesafio'],'click_iniciar_desafio',null,pag)
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Iniciar desafío</h1>
                  <p>¿Deseas iniciar este desafío?</p>
                  <button className="noo" onClick={()=>{this.cancelarboton();onClose()}}>No</button>
                  <button
                    className="sii"
                    onClick={() => {
                      this.confirmarboton();
                      onClose();
                    }}
                  >
                    Empezar
                  </button>
                </div>
              );
            }
          });
      };

    render(){
        if (!(this.state.detalle === null)){
            let pag = '/detalles/' + this.state.detalle['iddesafio']
            render_pag(pag)
            return(
                <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>{this.state.detalle['titulo']}</h1>
                        </div>
                        <div className="col-9 text-justify">
                        <strong>Descripción</strong>
                            <p>{this.state.detalle['descripcion']}</p>
                        </div>
                        <div className="col-3 text-justify">
                            <img className="img-fluid" src={`${dominio}/static/${this.state.detalle['imagen']}`}></img>
                        </div>
                        <div className="col-12 text-justify">
                            <h5><strong>Objetivo:</strong>{this.state.detalle['objetivos']}</h5>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-lg btn-success"  onClick={this.iniciar_boton} > Iniciar desafío</button>
                        </div>
                    </div>
                </div>
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

}