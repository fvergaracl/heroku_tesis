import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PanelGeneralScreen from './screens/panelgeneral'
import InicioScreen from './screens/inicio'
import PaginaNoEncontradaScreen from './screens/404'

import DesafioScreen from './screens/desafio/desafio'

export default class App extends React.Component {

  render(){
    return (
      <Router basename={'tesis'}>
  
          <Switch>
            <Route exact path="/">
              <InicioScreen />
            </Route>
            <Route path="/panel">
              <PanelGeneralScreen />
            </Route>
            <Route exact path="/desafio/:id" component={DesafioScreen} />
            <Route path="*">
              <PaginaNoEncontradaScreen />
            </Route>
            
          </Switch>
      </Router>
    );
  }
}

