import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/HomePage/LoginForm';
import RegisterForm from '../components/HomePage/RegisteForm';
import { Card, Tabs, Tab, CardContent } from '@material-ui/core';

export default function Home({ setIsAuthenticated }) {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                {/* ///////////////////////////////login & register box/////////////////////////////////// */}
                <div className={classes.card}>
                    <Card>
                        <CardContent>
                            {/* /////////////////////////////// Tab /////////////////////////////////////////////*/}
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
                                /////////////////////////////// Login /////////////////////////////////////////////
                                <LoginForm
                                    user={user}
                                    setUser={setUser}
                                    setIsAuthenticated={setIsAuthenticated}
                                />
                            ) : (
                                /////////////////////////////// Register ////////////////////////////////////////////
                                <RegisterForm
                                    user={user}
                                    setUser={setUser}
                                    setIsAuthenticated={setIsAuthenticated}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    card: {
        maxWidth: 600,
        padding: 10,
        margin: 'auto',
        width: '80%',
    },
    tabs: {
        margin: 'auto',
    },
}));
