import React from 'react';
import * as a from 'react-router'
import {render_pag} from '../helpers/rest';

import './404.css'
class PaginaNoEncontradaScreen extends React.Component{
  
  async componentDidMount(){
    let pagg = '/404/'
    await render_pag(pagg)
  }

  render(){
    return (
    <>
    <h1>Página no encontrada</h1>
        <p className="zoom-area"><b>CSS</b> Esta página no se encuentra disponible o no existe </p>
        <section className="error-container">
        <span className="four"><span className="screen-reader-text">4</span></span>
        <span className="zero"><span className="screen-reader-text">0</span></span>
        <span className="four"><span className="screen-reader-text">4</span></span>
        </section>
        <div className="link-container">
        <a onClick={()=>{window.history.back()}} href="# " className="more-link">Ir atrás</a>
        </div>
    </>
  );
  }
}

export default PaginaNoEncontradaScreen;
