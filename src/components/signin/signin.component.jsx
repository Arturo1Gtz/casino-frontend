import React, { useState } from 'react';
/*import FormInput from '../Input/forminput.component'*/
import './signin-style.scss';
import { Form, Input, Button } from 'semantic-ui-react';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils.js'


const SignIn = () => {
    const [login, setLogin] = useState({
        email:'',
        password:''
    });

    const handleChange = (event) =>{
        setLogin({
            ...login,
            [event.target.name] : event.target.value
        })
    }

    const sendData = async (event) => {
        event.preventDefault()
        const { email, password } = login
        try {
            await auth.signInWithEmailAndPassword( email, password );
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='formCont '>
            <Form onSubmit={sendData} className='formularioS'>
                <Input   size='large' type="email" placeholder='Email' required onChange={handleChange} name = "email"/>
                          
                <Input  size='large' type="password" placeholder='Contraseña' required onChange={handleChange} name="password"/>

                <Button type="submit">Sign in</Button>
                <Button onClick = {signInWithGoogle}>{' '} Ingresar con Google{' '}</Button>
            </Form>
        </div>
    );
}

export default SignIn;