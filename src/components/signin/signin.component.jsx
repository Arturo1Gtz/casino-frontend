import React, {useState} from 'react';
import './signin-style.css';
import { Segment, Form, Header } from 'semantic-ui-react';

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
        <Segment inverted>
            <Header as='h3' textAlign='center'>
                SignIn
            </Header>
            <span>Si ya estas registrado, por favor inicia sesion</span>
            <Form onSubmit={sendData}>
                <input
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
                name = "email"
                />
                <label>
                    Email
                </label>
                <input
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
                name="password"
                />
                <input type='submit' value='Submit Form'></input>
            </Form>
        </Segment>
    );
}

export default SignIn;