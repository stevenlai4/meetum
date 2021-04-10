import React, { useState } from 'react';
import AuthForm from '../components/HomePage/AuthForm';
import { useHistory } from 'react-router-dom';
import { cognitoRegister, cognitoLogin } from '../userAuth';

export default function Home({ setIsAuthenticated }) {
    // const history = useHistory();
    // const [user, setUser] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    // });

    // async function login(details) {
    //     let result;

    //     if (details.type === 'signUp') {
    //         // result = await onSubmitLogin(details);
    //         try {
    //             // cognito register api
    //             const response = await cognitoRegister({
    //                 name: user.name,
    //                 email: user.email,
    //                 password: user.password,
    //             });

    //             if (response) {
    //                 console.log('Successfully Register');
    //                 alert('please confirm email');
    //                 // } else {
    //                 //     setIsRegistering(false);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     if (details.type === 'login') {
    //         try {
    //             // cognito login api
    //             const response = await cognitoLogin({
    //                 email: user.email,
    //                 password: user.password,
    //             });

    //             if (response) {
    //                 console.log('Successfully login');
    //                 setIsAuthenticated(true);
    //                 // } else {
    //                 //     setIsRegistering(false);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     // result = await onSubmitSignUp(details);

    //     // Store the JWT into local storage
    //     // if (result.accessToken) {
    //     //     setToken(result.accessToken);
    //     //     history.push('/');
    //     // }
    // }

    // const onClose = async (data) => {
    //     console.log('close Clicked', data);
    // };

    return <AuthForm setIsAuthenticated={setIsAuthenticated} />;
}
