import React, { useState } from 'react'
import { firestore } from '../../firebase/firebase.utils'
import { useEffect } from 'react';

const User = () => {
    const [userData, setUserData] = useState(null);
    
    useEffect( () => {
        firestore.collection('user')
            .where('email', '==', 'yomero@chido.com')
            .get()
            .then( querySnapshot => {
                setUserData(querySnapshot.docs.map(
                    doc => doc.data()
                ));
            })
    })

    const name = "Diego Flores";
    const saldo = 10000;
    const id = "#109807";

    return(
        <div className='userIcon'>
            <span>Bienvenido {name} {id}</span>
            <h2>Saldo: {saldo}</h2>
        </div>
    )
}

export default User;