import React from 'react';
import './inicio.css'
import {login} from './../helpers/rest'
import {checkear_ultima_pagina} from './../helpers/local'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class InicioScreen extends React.Component {

  
  constructor(props){
    
    super(props)
    this.state = {
      usuario: '',
      contrasena: '',
      loadingactivo: false
    }
    this.setUsuario = this.setUsuario.bind(this)
    this.setContrasena = this.setContrasena.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
    checkear_ultima_pagina()
  }


  async handleSubmit(event) {
    this.setState({
      loadingactivo: true
    })
    let respuesta = await login(this.state.usuario,this.state.contrasena)
    this.setState({
      loadingactivo: false
    })
    if (!(respuesta['codigo']=== 200)){
      toast.error(respuesta['msj'],{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } else {
      localStorage.setItem('token', respuesta['token'])
      localStorage.setItem('ultimaPagina', '/panel')
      window.location.href = '/panel'
      
    }
    
    
  }

  setUsuario(e) {
    // e.target.value is the text from our input
    this.setState({
      usuario: e.target.value
    })
  }

  setContrasena(e) {
    // e.target.value is the text from our input
    this.setState({
      contrasena: e.target.value
    })
  }


  render(){
    return (
      <>
      {this.state.loadingactivo ? 
      <div class="overlay">
          <div class="overlay__wrapper">
              <div class="overlay__spinner">
                <div id="cover-spin">
                  <div className="spinner"></div>
                </div>
              </div>
          </div>
      </div>
  : ''}
      <ToastContainer />
      <div className="container h-100">
        <div className="col-sm-12">
          <p>&nbsp;</p>
        </div>
        <div className="col-sm-12  my-auto">
        

          <div className="container_login">

        <div className="row_login">
          <h1 className="h1_login"><i className="fa fa-lock" aria-hidden="true"></i> Login</h1>
       
  
              </div><br /><br />
              
              
                        <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                      </div>
                      <input type="text" name="" className="form-control" placeholder="Usuario" onChange={ this.setUsuario } value={ this.state.usuario } />
                    </div><br />
              
                        <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-key icon"></i></span>
                      </div>
                        <input type="Password" name="" className="form-control" placeholder="Contraseña" onChange={ this.setContrasena } value={ this.state.contrasena }/>
                    </div><br />
      
              
              <button type="submit" className="btn btn-info" onClick={this.handleSubmit} ><span className="glyphicon glyphicon-remove"></span>Entrar</button><br />
          
              
      
        </div>

   
        </div>
      </div>
    
      </>

    );
  }
}

