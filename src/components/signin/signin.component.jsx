import React, { useState } from 'react';
//import { connect } from 'react-redux'
/*import FormInput from '../Input/forminput.component'*/
import './signin-style.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js'
//import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'


const SignIn = () => {
    const [login, setLogin] = useState({
        email:'',
        password:''
    });
    const { email, password } = login;
    const sendData = async event => {
        event.preventDefault();
        
        try{
            await auth.signInWithEmailAndPassword(email, password);
            console.log(login);
            setLogin({
                email: '',
                password: ''
            });
        } catch (error){
            console.log(error);
        }
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

export default SignIn