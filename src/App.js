import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import MainPage from './pages/main/main.page';
import Mesa from './components/mesa/mesa.componente';
import './App.css';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux'
import { createUserProfileDocument, auth, createUserProfileDocument2 } from './firebase/firebase.utils';
//import { createStructuredSelector } from 'reselect';
//import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          });          
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div className="App">
      <div className='margen'>
      <Header className='encabezado' /> 
      <div className='contenido'>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route  path='/ruleta/' component={Mesa } />
        </Switch>
      </div>
         {/* <Croupier></Croupier> */}
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null, 
  mapDispatchToProps
)(App);
