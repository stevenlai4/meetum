import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/HomePage/LoginForm';
import RegisterForm from '../components/HomePage/RegisteForm';
import { Tabs, Tab } from '@material-ui/core';

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
            {/* ///////////////////////////////login & register box/////////////////////////////////// */}
            <div className={classes.card}>
                {/* /////////////////////////////// Tab /////////////////////////////////////////////*/}

                <Tabs
                    variant="fullWidth"
                    className={classes.tabs}
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label="LOGIN" style={{ color: 'white' }} />
                    <Tab label="SIGN UP" style={{ color: 'white' }} />
                </Tabs>

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
        borderRadius: '10px',
        padding: 10,
        width: '40%',
        // // zIndex: 1,
        // WebkitFilter: `blur(1px)   `,
    },
    tabs: {
        marginBottom: '6%',
    },
}));
