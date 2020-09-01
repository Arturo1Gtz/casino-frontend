import React, {useState} from 'react';
/*import FormInput from '../Input/forminput.component'*/
import './signin-style.css';
import { Segment, Form, Header, Input, Button} from 'semantic-ui-react';

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

    const sendData = (event) => {
        event.preventDefault()
        console.log(login.email + ' ' + login.password)
    }

    return (
        <Segment basic textAlign='center'>
            <Header as='h2' textAlign='right' color='red' dividing>
                Sign In
            </Header>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Form onSubmit={sendData}>
                <Input 
                transparent
                size='huge'
                type="email"
                placeholder='Email'
                required
                handleChange={handleChange}
                name = "email"
                />
                <br/>
                <br/>            
                <Input 
                transparent
                size='huge'
                type="password"
                placeholder='Contraseña'
                required
                handleChange={handleChange}
                name="password"
                />
                <br/>
                <br/>
                <Button type="subimt">Sign in</Button>
            </Form>
        </Segment>
    );
}

export default SignIn;