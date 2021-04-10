import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { cognitoRegister, cognitoLogin } from '../../userAuth';
import {
    Card,
    Tabs,
    Tab,
    CardContent,
    CardHeader,
    Input,
    Button,
    FormControl,
} from '@material-ui/core';

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
    input: {
        width: '80%',
        margin: '30px auto 30px auto',
    },
    postButton: {
        color: '#3f51b5',
        fontWeight: 'bold',
    },
}));

export default function AuthForm({ setIsAuthenticated }) {
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
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    placeholder="Email"
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                    value={user.email}
                                ></Input>
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                    value={user.password}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                className={classes.postButton}
                            >
                                Submit
                            </Button>
                        </form>
                    ) : (
                        ////////////////////////////////////////Register/////////////////////////////////////////
                        <form onSubmit={handleRegister}>
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    placeholder="Name"
                                    type="text"
                                    value={user.name}
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value,
                                        })
                                    }
                                ></Input>
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    placeholder="Email"
                                    type="email"
                                    value={user.email}
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                ></Input>
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    placeholder="Password"
                                    type="password"
                                    value={user.password}
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <Input
                                    className={classes.input}
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={user.confirmPassword}
                                    autoComplete="on"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                className={classes.postButton}
                            >
                                Submit
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
