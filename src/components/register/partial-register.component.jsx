import React, { useState } from 'react'
import { firestore, auth } from '../../firebase/firebase.utils'
import { SignUpTitle, SignUpContainer, ButtonsBarContainer } from './register.styles'
import CustomButton from '../custom-button/button.component'
import ImageInput from './imagereader.component'
import FormInput from '../../components/custom-input/input.component'
import './register.style.scss'

const PartialRegister = () => {

    const [register, setRegister] = useState({
        nickname: '',
        firstname: '',
        lastname: '',
        department: '',
        enterprise: '',
        imgurl: '',
        credits: 10000,
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]:value });
    }

    const { nickname, firstname, lastname, enterprise, department } = register

    const handleSubmit = async event => {
        const user = auth.currenUser;
        user.updateProfile({
            nickname: register.nickname,
            firstname: register.firstname,
            lastname: register.lastname,
            department: register.department,
            enterprise: register.enterprise,
            imgurl: register.imgurl,
            credits: register.credits
        })
    }

    return(
        <SignUpContainer>
            <SignUpTitle></SignUpTitle>
            <form className = 'formularioR' onSubmit ={handleSubmit}>
                <FormInput type="text" label='Nickname' required onChange={handleChange} name = "nickname" value = {nickname} autofocus/>                
                <FormInput type="text" label='Primer nombre' required onChange={handleChange} name = "firstname" value = {firstname} autofocus/>
                <FormInput type="text" label='Apellido' required onChange={handleChange} name = "lastname" value = {lastname} autofocus/>                
                <FormInput type="text" label='Empresa' required onChange={handleChange} name = "enterprise" value = {enterprise} autofocus/>
                <FormInput type="text" label='Departamento' required onChange={handleChange} name = "department" value = {department} autofocus/>
                <ButtonsBarContainer>            
                    <CustomButton type="submit"></CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignUpContainer>
    )
}
export default PartialRegister;