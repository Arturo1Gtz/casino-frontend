import React, { useState } from 'react'

const User = () => {
    const [userData, setUserData] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        department:'',
        enterprise:'',
        balance:'10000',
        avatar:'',
        isLogged:'',
    })

}

export default User;