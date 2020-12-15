import React, {useState} from 'react';

import './signin-signup.style.scss';
import SignIn from '../../components/signin/signin.component'
import Register from '../../components/register/register.component'

const SignInAndSignUpPage = () => {
    const [formulario, setForm] = useState(false);

    const changeform =()=>{
        setForm(!formulario);
    }
    return(

    <div className='sign'>
        <div className='sign__form1'>
            <div className={'sign__form1__cont'}>
                <SignIn />
            </div>
            <div className={'sign__form1__cont'}>
                <Register />
                
            </div>
        </div>
        <div className='sign__form2'>
        {formulario ?<SignIn />
            :<Register />
            }
        <div className={'sign__form2__btn'}>
            <span className={'sign__form2__btn__spn'} onClick={changeform}>{formulario?'REGISTRATE':'ACCEDER'} </span>
        </div>
        </div>
        
    </div>)
}


export default SignInAndSignUpPage;