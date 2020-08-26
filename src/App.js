import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/header/header.component';
import MainPage from './pages/main/main.page';
import RoulettePage from './pages/roulette/roulette.page';
import Croupier from './components/croupier/croupier.componente';
import SidebarA from './components/sidebar/sidebar.componente';


import './App.css';

function App() {
  return (
    <div className="App">
      <Header className='encabezado' /> 
      <div className='contenido'>
      
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route  path='/roulette' component={Croupier } />
        </Switch>
      </div>
         <SidebarA>
         </SidebarA>
         {/* <Croupier></Croupier> */}
    </div>
  );
}

export default App;
