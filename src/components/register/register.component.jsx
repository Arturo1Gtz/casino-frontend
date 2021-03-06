import React, { useEffect, useState } from 'react';
import FormInput from '../custom-input/input.component'
import CustomButton from '../custom-button/button.component'
import { SignUpTitle, ButtonsBarContainer } from './register.styles';
import './register.style.scss'
import { auth, createUserProfileDocument2, firestore } from '../../firebase/firebase.utils';


const Register = () => {

    const collectionRef = firestore.collection('user');
    const [duplicateNickname, setDuplicateNickname] = useState(false);
    const [nick, setNick] = useState("");

    const [register, setRegister] = useState({
       
        email:'',
        password:'',
        cpassword:'',
        nickname:'',
        firstname:'',
        lastname:'',
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
        imgurl:'',
        credits: 10000
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]:value });
        setAdittionalData({ ...adittionalData, [name]:value })
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

    const { email, password, cpassword, nickname, firstname, lastname, department, enterprise, imgurl, credits } = register;
    const {nickname1, firstname1, lastname1, department1, enterprise1, imgurl1, credits1 } = adittionalData;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (password !== cpassword) {
            alert("Las contraseñas no coinciden");
            return
        }

        if(duplicateNickname){
            alert("Nickname ocupado");
            return
        }
        
        try {
            console.log(register)
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDocument2(user, adittionalData);
        } catch (error) {
            console.error(error)
            alert(error)
        }
    };
    
    return(
        <div className={'signUp'}>
            <SignUpTitle>Crea una cuenta nueva</SignUpTitle>
            <form className='formularioR' onSubmit={handleSubmit}>
                <FormInput type="email" label='Email' required onChange={handleChange} name = "email" value = {email} autofocus/>
                <FormInput type="password" label='Contraseña' required onChange={handleChange} name="password" value = {password} autofocus/>
                <FormInput type="password" label='Confirma contraseña' required onChange={handleChange} name="cpassword" value = {cpassword} autofocus/>
                <FormInput type="text" label='Nombre de Usuario' required onChange={handleChange} name = "nickname" value = {nickname} autofocus/>                
                <FormInput type="text" label='Primer nombre' required onChange={handleChange} name = "firstname" value = {firstname} autofocus/>
                <FormInput type="text" label='Apellido' required onChange={handleChange} name = "lastname" value = {lastname} autofocus/>                
                <FormInput type="text" label='Empresa' required onChange={handleChange} name = "enterprise" value = {enterprise} autofocus/>
                <FormInput type="text" label='Departamento' required onChange={handleChange} name = "department" value = {department} autofocus/>
                <div class={'signUp__btn'}>            
                    <CustomButton type="submit">Registro</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default Register;
