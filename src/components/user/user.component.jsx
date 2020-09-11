import React, { useState } from 'react'
import { firestore } from '../../firebase/firebase.utils'
import { useEffect } from 'react';

const User = (userState) => {
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

    return(
        <div className='userIcon'>
            <span>Hola soy el usuario</span>
            <h2></h2>
        </div>
    )
}

export default User;