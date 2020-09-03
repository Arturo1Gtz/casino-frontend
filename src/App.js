import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/header/header.component';
import MainPage from './pages/main/main.page';
import RoulettePage from './pages/roulette/roulette.page';
import Croupier from './components/croupier/croupier.componente';
import Mesa from './components/mesa/mesa.componente';


import './App.css';

function App() {
  return (
    <div className="App">
    <div className='margen'>

      <Header className='encabezado' /> 
      <div className='contenido'>
      
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route  path='/ruleta' component={Mesa } />
        </Switch>
      </div>
         {/* <Croupier></Croupier> */}
    </div>
    </div>
  );
}

export default App;
