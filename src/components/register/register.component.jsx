import React, {useState} from 'react';
import {Input, Segment, Header, Form, Button} from 'semantic-ui-react'

import ImageInput from './imagereader.component'
import './register.style.scss';

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
        <div className='registerCont'>
            <Form className='formularioR' onSubmit={sendData}>

                <Input type="email" size='small' transparent placeholder='Email' required handleChange={handleChange} name = "email"/>
                
                <Input transparent type="password" size='small' required placeholder='Contraseña' handleChange={handleChange} name="password"/>
        
                <Input type="text" size='small' transparent placeholder='Primer nombre' required handleChange={handleChange} name = "firstname"/>
                
                <Input type="text" size='small' transparent placeholder='Apellido' required handleChange={handleChange} name = "lastname"/>
                
                <Input type="text" size='small' transparent placeholder='Empresa' required handleChange={handleChange} name = "enterprise"/>
                
                <Input type="text" size='small' transparent placeholder='Departamento' required handleChange={handleChange} name = "department"/>
                
                <ImageInput/>
                
                <Button  type="submit">Registro</Button>
                
            </Form>
        </div>
    )
}
export default Register;