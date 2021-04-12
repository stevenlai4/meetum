import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/HomePage/LoginForm';
import RegisterForm from '../components/HomePage/RegisteForm';
import { Tabs, Tab } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../images/meetum-logo.png';

export default function Home({ setIsAuthenticated }) {
    const classes = useStyles();
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [cognitoError, setCognitoError] = useState('');
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

    // Handle errors function
    const handleErrors = () => {
        let tempArr = [];

        //Password length validation;
        if (user.password.length < 8) {
            tempArr.push('Password needs to be a minimum of 8 characters');
        }

        // Uppercase validation
        let upperCase = new RegExp(/^(?=.*[A-Z])/);
        if (!upperCase.test(user.password)) {
            tempArr.push('Password needs an UPPERCASE letter');
        }

        //Lowercase validation
        let lowerCase = new RegExp(/^(?=.*[a-z])/);
        if (!lowerCase.test(user.password)) {
            tempArr.push('Password needs an lowercase letter');
        }
        //Number validation
        let digits = new RegExp(/^(?=.*[0-9])/);
        if (!digits.test(user.password)) {
            tempArr.push('Password needs to include a number');
        }
        //Special character validaton
        let special = new RegExp(/^(?=.*?[#?!@$%^&*-])/);
        if (!special.test(user.password)) {
            tempArr.push('Password needs to include a special character');
        }

        //Password match validation
        if (user.password !== user.confirmPassword) {
            tempArr.push('Password & Confirm Password does not match');
        }

        return tempArr;
    };

    return (
        <div className={classes.root}>
            <img src={logo} alt="Logo" className={classes.logo} />
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
                    <LoginForm
                        user={user}
                        setUser={setUser}
                        setIsAuthenticated={setIsAuthenticated}
                        handleErrors={handleErrors}
                        setErrorMsgs={setErrorMsgs}
                        setCognitoError={setCognitoError}
                    />
                ) : (
                    /////////////////////////////// Register ////////////////////////////////////////////
                    <RegisterForm
                        user={user}
                        setUser={setUser}
                        setIsAuthenticated={setIsAuthenticated}
                        handleErrors={handleErrors}
                        errorMsgs={errorMsgs}
                        setErrorMsgs={setErrorMsgs}
                        setCognitoError={setCognitoError}
                    />
                )}
            </div>
            {/* /////////////////////////////// Show validation alert //////////////////////////////////////////// */}
            <div>
                {errorMsgs.map((errorMsg, index) => (
                    <Alert
                        className={classes.alert}
                        key={index}
                        severity="error"
                    >
                        {errorMsg}
                    </Alert>
                ))}
                {cognitoError ? (
                    <Alert className={classes.alert} severity="error">
                        {cognitoError}
                    </Alert>
                ) : null}
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
        flexDirection: 'column',
        height: '100hv',
        margin: '5%',
    },
    logo: {
        width: '200px',
        position: 'absolute',
        left: 10,
        top: 10,
    },
    card: {
        borderRadius: '10px',
        width: '40%',
        border: '1px solid white',
        display: 'inline-block',
        // // background: '#eff3ff66',
        // background: '#f0f0f066',
        // zIndex: 1,
        // position: 'relative',
        backdropFilter: `blur(1px)`,
        backgroundClip: 'border-box',
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
    alert: {
        margin: '5%',
    },
}));
