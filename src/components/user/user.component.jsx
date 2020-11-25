import { registerVersion } from 'firebase';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { firestore, auth } from '../../firebase/firebase.utils';
import { Form, Input, Select } from 'semantic-ui-react';
import CustomButton from '../custom-button/button.component';
import './user.style.scss';

const User = ({currentUser}) => {
    const [transfer, setTransfer] = useState(0);
    const [getCredits, setGetCredits] = useState(0);
    const [userArray, setUserArray] = useState();
    const collectionRef = firestore.collection('user').where("nickname", "!=", `${currentUser.nickname}`);
    const [option, setOption] = useState();

    useEffect(() => {
        const userMapping = () => collectionRef.onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({
                key: doc.data().nickname,
                value: doc.data().nickname, 
                id: doc.id,
                text: doc.data().nickname
            }));
            console.log(postData);
            setUserArray(postData)
        })
        return() => userMapping()
    },[transfer])

    const handleChange = event => {
        const { value } = event.target;
        setOption(value);
        console.log("Opcion ", value, event.target.value);
    }
    
    const handleTransfer = event => {
        const { value } = event.target;
        setTransfer(value)
        console.log("Creditos Transferrencia", transfer)
        console.log("Usuarios", userArray);
    }
    
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            const updateRef = firestore.collection("user").doc(`${option.id}`)
            updateRef.get().then(function(doc){setGetCredits(doc.data().credits)})
            updateRef.update({
                credits: getCredits + transfer
            })
        } catch (error) {
            console.error(error)
        }
        
    }
        
    return(
        <div className='contenido'>
            <span>Hola soy el usuario {currentUser.nickname}</span>
            <div className = 'userIcon'>
                <img className = 'icon' src={currentUser.imgurl} alt={currentUser.nickname}></img>
            </div>
            <div className='transferForm'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label='Monto a transferir'
                            type='number'
                            value={transfer}
                            onChange={handleTransfer}
                            min='1000'
                            max={currentUser.credits}
                        />
                        <Form.Field
                            control={Select}
                            label='Destinatario'
                            options={userArray}
                            value={option}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <CustomButton type='submit'>Transeferir</CustomButton>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(User);