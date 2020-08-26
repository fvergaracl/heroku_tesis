import React from 'react'
import Likert from 'react-likert-scale';
import {  render_pag, reg_accion_test, reg_accion} from './../../helpers/rest'
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap'

export default class PretestScreen extends React.Component {

    
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            preguntas: <></>,
            respuestas: null,
            btnhabilitado: false,
            detalle: null,
            renderizado: false,
            valores_test:[],
            collapse: undefined
        }
      }

      toggle(e) {
        let event = e.target.dataset.event;
        let pag = '/pretest/' + this.state.detalle['iddesafio']
        if (this.state.collapse === undefined || this.state.collapse === 0){
          reg_accion(this.state.detalle['iddesafio'],'click_ABRIR_ver_desafio_pretest',null,pag)
        } else {
          reg_accion(this.state.detalle['iddesafio'],'click_CERRAR_ver_desafio_pretest',null,pag)
        }
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
      }
    
    cambiar_datos(idtest,valor){
        reg_accion_test(idtest,valor,'preseleccionado',this.state.detalle['iddesafio'],'pretest')
        let esta_registro = false
        let ide = 'likert_' + idtest
        for (let i = 0; i < this.state.valores_test.length; i++) {
            if (this.state.valores_test[i][0] === ide){
                esta_registro = true
                this.state.valores_test[i][1] = valor
            }
        }
        if (!(esta_registro)){
            this.state.valores_test.push([ide,valor])
        }
        let new_respuesta = []
        let se_habilita_btn = true
        this.state.respuestas.forEach(element => {
            if (String(element['idtest'])===String(idtest)){
                element['respuesta'] = valor
            }
            if (element['respuesta'] === -1){
                se_habilita_btn = false
            }
            new_respuesta.push(element)
        });
        this.setState({
            respuestas: new_respuesta,
            btnhabilitado: se_habilita_btn
        })
    }
    
    
    armando_pagina(cuestionario){
        let likertOptions = {}
        let respuesta_ = []
        let response__ = cuestionario.map((item, index)=>{
            respuesta_.push({idtest: item['idtest'], respuesta: -1})
            likertOptions = {
                question: item['pregunta'],
                responses: [
                  { value: 1, text: "Poco" },
                  { value: 2, text: "" },
                  { value: 3, text: "" },
                  { value: 4, text: "" },
                  { value: 5, text: "" },
                  { value: 6, text: "" },
                  { value: 7, text: "" },
                  { value: 8, text: "" },
                  { value: 9, text: "" },
                  { value: 10, text: "Mucho" }
                ],
                picked: val => {
                  this.cambiar_datos(item['idtest'],val)
                }
              };
            return( <>
            <h3> &nbsp;</h3>
            <h3> &nbsp;</h3>
            <Likert id={`likert_${item['idtest']}`} {...likertOptions} />
            </>)
        })
        this.setState({
            preguntas:response__,
            respuestas: respuesta_
        }
        )
    }
    
    enviar_respuestas = () =>{
        for (let i = 0; i < this.state.valores_test.length; i++) {
            let idee = this.state.valores_test[i][0].split('_')[1]
            reg_accion_test(idee,this.state.valores_test[i][1],'seleccionado',this.state.detalle['iddesafio'],'pretest')
        }
        this.props.cambiar_estado(1)
    }

    componentDidMount(){
        this.armando_pagina(this.props.cuestionario)
        this.setState({
            detalle: this.props.detalle
        })
        this.enviar_render(this.props.detalle['iddesafio'])
    }

    enviar_render= async (id_desafio)=> {
        
        if (!(this.state.renderizado)){
            let pag = '/pretest/' + id_desafio
            await render_pag(pag)
            this.setState({
                renderizado: true
            })
        }
    }

    render(){
        if (!(this.state.detalle === null)){
            const {collapse} = this.state;
            return(
                <>
                <div className="container">
                    <div className="row">
                    <div className="col-12 text-center">
                    <Card style={{ marginBottom: '1rem' }} key={1}>
                        <CardHeader className="col-12 text-center" ><button className="btn btn-lg btn-primary" onClick={this.toggle} data-event={1}>Ver desafío</button></CardHeader>
                        <Collapse isOpen={collapse === 1}>
                        <CardBody>
                        <p><strong>Título:</strong>{this.state.detalle['titulo']}</p>
                        <p><strong>Descripción:</strong>{this.state.detalle['descripcion']}</p>
                        <hr></hr>
                        <p style={{fontSize: '1.3em'}}><strong>Objetivos:</strong>{this.state.detalle['objetivos']}</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                        </div>
                        <div className="col-12 text-center">
                        {this.state.preguntas}
                        <button className="btn btn-lg btn-success" disabled={!this.state.btnhabilitado} onClick={()=>{this.enviar_respuestas()}}> Enviar respuestas</button>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    } 

}