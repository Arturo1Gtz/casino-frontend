import React from 'react';
import { SignInAndSignUpContainer } from './inicio-styles';
import SignIn from '../../components/signin/signin.component'
import Register from '../../components/register/register.component'

const SignInAndSignUpPage = () => (
    <SignInAndSignUpContainer>
        <SignIn />
        <Register />
    </SignInAndSignUpContainer>
)


export default SignInAndSignUpPage;