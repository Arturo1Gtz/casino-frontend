import React, {useState} from 'react';
import {Input, Segment, Header, Form, Button} from 'semantic-ui-react'
import ImageInput from './imagereader.component'

const Register = () => {
    const [register, setRegister] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        avatar:'',
        department:'',
        enterprise:''

    });

    const handleChange = (event) =>{
        setRegister({
            ...register,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault()
        console.log(register.email + ' ' + register.password)
    }

    return(
        <Segment basic>
            <Header as='h2' textAlign='center' color='red' dividing>
                Registro
            </Header>
            <br/>
            <br/>
            <br/>
            <Form onSubmit={sendData}>
                <Input
                type="email"
                size='huge'
                transparent
                placeholder='Email'
                required
                handleChange={handleChange}
                name = "email"
                />
                <br/>
                <br/>
                <Input
                transparent
                type="password"
                size='huge'
                required
                placeholder='Contraseña'
                handleChange={handleChange}
                name="password"
                />
                <br/>
                <br/>
                <Input
                type="text"
                size='huge'
                transparent
                placeholder='Primer nombre'
                required
                handleChange={handleChange}
                name = "firstname"
                />
                <br/>
                <br/>
                <Input
                type="text"
                size='huge'
                transparent
                placeholder='Apellido'
                required
                handleChange={handleChange}
                name = "lastname"
                />
                <br/>
                <br/>
                <Input
                type="text"
                size='huge'
                transparent
                placeholder='Empresa'
                required
                handleChange={handleChange}
                name = "enterprise"
                />
                <br/>
                <br/>
                <Input
                type="text"
                size='huge'
                transparent
                placeholder='Departamento'
                required
                handleChange={handleChange}
                name = "department"
                />
                <br/>
                <br/>
                <ImageInput/>
                <br/>
                <br/>
                <Button  type="submit">Registro</Button>
                
            </Form>
        </Segment>
    )
}
export default Register;