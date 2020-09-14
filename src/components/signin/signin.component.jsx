import React, { useState } from 'react';
import { connect } from 'react-redux'
/*import FormInput from '../Input/forminput.component'*/
import './signin-style.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import { signInWithGoogle } from '../../firebase/firebase.utils.js'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'


const SignIn = ({ emailSignInStart }) => {
    const [login, setLogin] = useState({
        email:'',
        password:''
    });

    const { email, password } = login;

    const sendData = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange = (event) =>{
        const { value, name } = event.target;
        setLogin({ ...login, [name]: value });
    }

    return (
        <div className='formCont '>
            <Form onSubmit={sendData} className='formularioS'>
                <Input   size='large' type="email" placeholder='Email' required onChange={handleChange} name = "email" value = {email}/>
                          
                <Input  size='large' type="password" placeholder='Contraseña' required onChange={handleChange} name="password" value = {password}/>

                <Button type="submit">Sign in</Button>
                <Button onClick = {signInWithGoogle}>{' '} Ingresar con Google{' '}</Button>
            </Form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
  });

export default connect(
    null,
    mapDispatchToProps
  )(SignIn);