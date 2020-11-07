import React, { useState } from 'react';
import FormInput from '../custom-input/input.component'
import CustomButton from '../custom-button/button.component'
import { SignUpContainer, SignUpTitle, ButtonsBarContainer } from './register.styles';
import './register.style.scss'
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
        imgurl:'',
        credits: 10000

    });

    const [ adittionalData, setAdittionalData ] = useState({

        firstname:'',
        lastname:'',
        nickname:'',
        department:'',
        enterprise:'',
        imgurl1:'',
        credits: 10000
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]:value });
        setAdittionalData({ ...adittionalData, [name]:value })
        console.log(register);
    }

    const { email, password, cpassword, nickname, firstname, lastname, department, enterprise, imgurl, credits } = register;
    const {nickname1, firstname1, lastname1, department1, enterprise1, imgurl1, credits1 } = adittionalData;

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
        <SignUpContainer>
            <SignUpTitle>Crea una cuenta nueva</SignUpTitle>
            <form className='formularioR' onSubmit={handleSubmit}>
                <FormInput type="email" label='Email' required onChange={handleChange} name = "email" value = {email}/>
                <FormInput type="password" label='Contraseña' required onChange={handleChange} name="password" value = {password}/>
                <FormInput type="password" label='Confirma contraseña' required onChange={handleChange} name="cpassword" value = {cpassword}/>
                <FormInput type="text" label='Nickname' required onChange={handleChange} name = "nickname" value = {nickname}/>                
                <FormInput type="text" label='Primer nombre' required onChange={handleChange} name = "firstname" value = {firstname}/>
                <FormInput type="text" label='Apellido' required onChange={handleChange} name = "lastname" value = {lastname}/>                
                <FormInput type="text" label='Empresa' required onChange={handleChange} name = "enterprise" value = {enterprise}/>
                <FormInput type="text" label='Departamento' required onChange={handleChange} name = "department" value = {department}/>
                <ButtonsBarContainer>            
                    <CustomButton type="submit">Registro</CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignUpContainer>
    )
}

export default Register;
