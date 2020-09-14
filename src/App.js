import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import MainPage from './pages/main/main.page';
import Mesa from './components/mesa/mesa.componente';
import './App.css';
import { checkUserSession } from './redux/user/user.actions';
import { connect } from 'react-redux'

const App = ({ checkUserSession }) => {
  
  useEffect( () => {
    checkUserSession();
  }, [checkUserSession]);


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

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapDispatchToProps
)(App);
