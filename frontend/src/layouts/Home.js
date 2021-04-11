import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/HomePage/LoginForm';
import RegisterForm from '../components/HomePage/RegisteForm';
import { Tabs, Tab } from '@material-ui/core';
import logo from '../images/meetum-logo.png';
import { useHistory } from 'react-router-dom';
import { cognitoLogin, cognitoRegister } from '../userAuth';

export default function Home({ setIsAuthenticated }) {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    //handle tab
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    //handle login
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

    //handle register
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
            <img src={logo} alt="Logo" className={classes.logo} />;
            {/* ///////////////////////////////login & register box/////////////////////////////////// */}
            <div className={classes.card}>
                {/* /////////////////////////////// Tab /////////////////////////////////////////////*/}

                <Tabs
                    variant="fullWidth"
                    classes={{
                        indicator: classes.indicator,
                    }}
                    className={classes.tabs}
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="inherit"
                    onChange={handleTabChange}
                >
                    <Tab label="LOGIN" style={{ color: 'white' }} />
                    <Tab label="SIGN UP" style={{ color: 'white' }} />
                </Tabs>

                {tabValue === 0 ? (
                    /////////////////////////////// Login /////////////////////////////////////////////
                    <form onSubmit={handleLogin}>
                        <LoginForm
                            user={user}
                            setUser={setUser}
                            setIsAuthenticated={setIsAuthenticated}
                        />
                    </form>
                ) : (
                    /////////////////////////////// Register ////////////////////////////////////////////
                    <form onSubmit={handleRegister}>
                        <RegisterForm
                            user={user}
                            setUser={setUser}
                            setIsAuthenticated={setIsAuthenticated}
                        />
                    </form>
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
    logo: {
        width: '200px',
        position: 'absolute',
        left: 10,
        top: 10,
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
        indicator: {
            backgroundColor: 'white',
        },
    },
    indicator: {
        backgroundColor: 'white',
    },
}));
