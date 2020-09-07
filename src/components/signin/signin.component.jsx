import React, {useState} from 'react';
/*import FormInput from '../Input/forminput.component'*/
import './signin-style.scss';
import { Segment, Form, Header, Input, Button} from 'semantic-ui-react';


const SignIn = () => {
    const [login, setLogin] = useState({
        email:'',
        password:''
    });

    const handleChange = (event) =>{
        setLogin({...login, [event.target.name] : event.target.value});
    }

    const sendData = (event) => {
        event.preventDefault()
        console.log(login.email + ' ' + login.password)
    }

    return (
        <div className='formCont '>
            <Form onSubmit={sendData} className='formularioS'>
                <Input   size='large' type="email" placeholder='Email' required handleChange={handleChange} name = "email"/>
                          
                <Input  size='large' type="password" placeholder='Contraseña' required handleChange={handleChange} name="password"/>

                <Button type="submit">Sign in</Button> 
            </Form>
        </div>
    );
}

export default SignIn;