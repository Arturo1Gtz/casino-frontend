import React, { useState, useEffect } from 'react'
import { firestore, auth } from '../../firebase/firebase.utils'
import { SignUpTitle, SignUpContainer, ButtonsBarContainer } from './register.styles'
import CustomButton from '../custom-button/button.component'
import ImageInput from './imagereader.component'
import FormInput from '../../components/custom-input/input.component'
import './register.style.scss'
import { connect } from 'react-redux'

const PartialRegister = ({currentUser}) => {

    const collectionRef = firestore.collection('user');
    const [duplicateNickname, setDuplicateNickname] = useState(false);
    const [nick, setNick] = useState("");

    const [register, setRegister] = useState({
        nickname: '',
        firstname: '',
        lastname: '',
        department: '',
        enterprise: '',
    });

    const userRef = firestore.collection("user").doc(`${currentUser.id}`)

    const handleChange = event => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]:value });
        setNick(register.nickname)
    }
    
    useEffect(() => {
        const validatingNickname = () => collectionRef.get().then((querySnapshot) => {
            setDuplicateNickname(false);
            querySnapshot.forEach((doc) => {
                if(nickname === doc.data().nickname) {
                    console.log("Se repitio este nickname: ", register.nickname, duplicateNickname, doc.data().nickname)
                    setDuplicateNickname(true)
                    console.log("Manzanoria", duplicateNickname)
                }
            })
        })

        return() => validatingNickname()
    }, [nick])

    const { nickname, firstname, lastname, enterprise, department } = register

    const handleSubmit = async event => {
        event.preventDefault();
        
        if(duplicateNickname){
            alert("Nickname ocupado");
            return
        }

        try{
            userRef.update({
                nickname: register.nickname,
                firstname: register.firstname,
                lastname: register.lastname,
                department: register.department,
                enterprise: register.enterprise,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <SignUpContainer>
            <SignUpTitle>Faltaron unos datos</SignUpTitle>
            <form className = 'formularioR' onSubmit ={handleSubmit}>
                <FormInput type="text" label='Nickname' required onChange={handleChange} name = "nickname" value = {nickname} autofocus/>                
                <FormInput type="text" label='Primer nombre' required onChange={handleChange} name = "firstname" value = {firstname} autofocus/>
                <FormInput type="text" label='Apellido' required onChange={handleChange} name = "lastname" value = {lastname} autofocus/>                
                <FormInput type="text" label='Empresa' required onChange={handleChange} name = "enterprise" value = {enterprise} autofocus/>
                <FormInput type="text" label='Departamento' required onChange={handleChange} name = "department" value = {department} autofocus/>
                <ButtonsBarContainer>            
                    <CustomButton type="submit">Enviar</CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignUpContainer>
    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(PartialRegister);