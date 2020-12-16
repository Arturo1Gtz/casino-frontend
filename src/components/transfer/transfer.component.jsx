import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase.utils';
import Select from 'react-select';
import CustomButton from '../custom-button/button.component'
import './transfer-styles.scss'

const Transfer = ({ currentUser }) => {

    const [transfer, setTransfer] = useState(0);
    const [userArray, setUserArray] = useState();
    const collectionRef = firestore.collection('user').where("nickname", "!=", `${currentUser.nickname}`);
    const [options, setOption] = useState();

    useEffect(() => {
        const userMapping = () => collectionRef.get().then((querySnapshot) => {
            const postData = [];
            querySnapshot.forEach((doc) => postData.push({
                value: doc.id,
                label: doc.data().nickname
            }))
            //console.log(postData)
            setUserArray(postData)
        })

        return() => userMapping()
    },[transfer])

    const handleChange = option => {
        setOption(option);
        //console.log("Opcion ", options);
    }

    const handleTransfer = event => {
        const { value } = event.target;
        setTransfer(value)
        //console.log("Creditos Transferrencia", transfer)
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        const updateRef = firestore.collection("user").doc(`${options.value}`)
        const localRef = firestore.collection("user").doc(`${currentUser.id}`)
        let transfered = parseInt(transfer, 10);
        try{              
            updateRef.update({
                credits: firebase.firestore.FieldValue.increment(transfered)
            })
            localRef.update({
                credits: firebase.firestore.FieldValue.increment(-transfered)
            })
            setTransfer(0)
            setOption()
            //console.log("Creditos actuales ",currentUser.credits)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className='transfer'>
            <div className={'transfer__cont'}>
                <h1><b>Transferencia</b></h1>
                <span>Ingrese el monto, y enseguida elija un destinatario</span>
                <form onSubmit={handleSubmit} className={'transfer__cont__form'}>
                    <div className={'transfer__cont__form__group'}>
                        <label>Monto a transferir</label>
                        <input
                            type='number'
                            value={transfer}
                            onChange={handleTransfer}
                            min='1000'
                            max={currentUser.credits}
                        />
                        <div>
                            <label>Destinatario</label>
                            <Select 
                                onChange={handleChange}
                                options={userArray}
                                value={options}
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                                className="transfer__cont__form__group__select"
                            />
                        </div>
                    </div>
                    <CustomButton type='submit'>Transferir</CustomButton>
                </form>
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
)(Transfer);