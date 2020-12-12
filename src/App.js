import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import MainPage from './pages/main/main.page';
import Croupier from './components/croupier/croupier.componente';
// import Admin from './components/admin/admin.componente';
import RoomsPage from './pages/rooms/rooms.component';
import SignInAndSignUpPage from './pages/signin-signup/inicio'

import './App.css';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux'
import { createUserProfileDocument, auth} from './firebase/firebase.utils';
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
    const {currentUser} = this.props;
    return (
      <div className="App">
        <Header className='encabezado' /> 

        <div className='mainContainer'>
          {currentUser ? 
            <div className='contenido'>
              <Switch>
                <Route exact path='/' component={RoomsPage} />
                <Route  path='/ruleta/:mesa' component={Croupier} />
              </Switch>
            </div>
              :
            <SignInAndSignUpPage/>
          }
          
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps,   mapDispatchToProps)(App);
