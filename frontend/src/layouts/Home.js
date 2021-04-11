import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/HomePage/LoginForm';
import RegisterForm from '../components/HomePage/RegisteForm';
import { useHistory } from 'react-router-dom';
import { cognitoRegister, cognitoLogin } from '../userAuth';
import { Card, Tabs, Tab, CardContent, CardHeader } from '@material-ui/core';

export default function Home({ setIsAuthenticated }) {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    const history = useHistory();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // cognito login api
            const response = await cognitoLogin({
                email: user.email,
                password: user.password,
            });
            if (response) {
                alert('Successfully login');
                setIsAuthenticated(true);
                history.push('./dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            // cognito register api
            const response = await cognitoRegister({
                name: user.name,
                email: user.email,
                password: user.password,
            });
            if (response) {
                console.log('Successfully Register');
                alert('please confirm email');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader
                    className={classes.header}
                    title={tabValue === 0 ? 'Login' : 'Sign Up'}
                />
                <CardContent>
                    <Tabs
                        variant="fullWidth"
                        className={classes.tabs}
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                    >
                        <Tab label="LOGIN" />
                        <Tab label="SIGN UP" />
                    </Tabs>
                </CardContent>
                <CardContent>
                    {tabValue === 0 ? (
                        ////////////////////////////////////////Login/////////////////////////////////////////
                        <form onSubmit={handleLogin}>
                            <LoginForm user={user} setUser={setUser} />
                        </form>
                    ) : (
                        ////////////////////////////////////////Register/////////////////////////////////////////
                        <form onSubmit={handleRegister}>
                            <RegisterForm user={user} setUser={setUser} />
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        padding: 10,
        margin: 'auto',
    },
    header: {
        textAlign: 'center',
    },
    tabs: {
        margin: 'auto',
    },
}));
