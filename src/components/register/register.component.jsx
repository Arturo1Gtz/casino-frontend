import React, { useState } from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import './register.style.scss';
import { auth, createUserProfileDocument2 } from '../../firebase/firebase.utils';

const Register = () => {
    const [register, setRegister] = useState({
       
        email:'',
        password:'',
        cpassword:'',
        nickname:'',
        firstname:'',
        lastname:'',
        avatar:'',
        department:'',
        enterprise:'',
        credits: 10000

    });
    const [ adittionalData, setAdittionalData ] = useState({

        firstname:'',
        lastname:'',
        nickname:'',
        avatar:'',
        department:'',
        enterprise:'',
        credits: 10000
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]:value });
        setAdittionalData({ ...adittionalData, [name]:value })
    }

    const { email, password, cpassword, nickname, firstname, lastname, department, avatar, enterprise, credits } = register;
    const {nickname1, firstname1, lastname1, department1, avatar1, enterprise1, credits1 } = adittionalData;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (password !== cpassword) {
            alert("Las contraseñas no coinciden");
            return
        }

        try {
            console.log(register)
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDocument2(user, adittionalData);
        } catch (error) {
            console.error(error)
        }
    };
    
    return(
        <div className='registerCont'>
            <Form className='formularioR' onSubmit={handleSubmit}>

                <Input type="email" size='small' placeholder='Email' required onChange={handleChange} name = "email"/>
                
                <Input type="password" size='small' required placeholder='Contraseña' onChange={handleChange} name="password"/>
                
                <Input type="password" size='small' required placeholder='Confirma contraseña' onChange={handleChange} name="cpassword"/>
        
                <Input type="text" size='small' placeholder='Nickname' required onChange={handleChange} name = "nickname"/>
                
                <Input type="text" size='small' placeholder='Primer nombre' required onChange={handleChange} name = "firstname"/>
                
                <Input type="text" size='small' placeholder='Apellido' required onChange={handleChange} name = "lastname"/>
                
                <Input type="text" size='small' placeholder='Empresa' required onChange={handleChange} name = "enterprise"/>
                
                <Input type="text" size='small' placeholder='Departamento' required onChange={handleChange} name = "department"/>
                
                <Button  type="submit">Registro</Button>
                
            </Form>
        </div>
    )
}

export default Register;
