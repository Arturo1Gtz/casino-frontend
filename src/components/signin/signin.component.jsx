import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js'
import FormInput from '../custom-input/input.component'
import CustomButton from '../custom-button/button.component'
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './signin.styles';
import './signin-style.scss'

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
        <SignInContainer>
            <SignInTitle>Ingresa con tu correo y contraseña</SignInTitle>
            <form onSubmit={sendData} className='formularioS'>
                <FormInput type="email" required onChange={handleChange} name = "email" value = {email} label = 'Email'/>
                <FormInput type="password" required onChange={handleChange} name="password" value = {password} label = 'Password'/>
                <ButtonsBarContainer>
                    <CustomButton type="submit">Iniciar Sesión</CustomButton>
                    {/* <CustomButton type="button" onClick = {signInWithGoogle} isGoogleSignIn >Google</CustomButton> */}
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
}

export default SignIn