import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { cognitoLogin } from '../../userAuth';

export default function LoginForm({
    setUser,
    user,
    setIsAuthenticated,
    setErrorMsgs,
}) {
    const classes = useStyles();
    const history = useHistory();

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
            setErrorMsgs([error.message]);
            setTimeout(() => setErrorMsgs([]), 5000);
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <FormControl fullWidth={true}>
                <input
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
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <input
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
            <div className={classes.button}>
                <Button
                    type="submit"
                    variant="outlined"
                    className={classes.submitButton}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        width: '60%',
        margin: '3% auto',
        padding: '3%',
        border: 'none',
        borderRadius: '10px',
        '&:focus': {
            outline: 'none',
        },
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: '#FFF',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
    },
    submitButton: {
        color: '#FFF',
        fontWeight: 'bold',
        borderRadius: '20px',
        fontSize: '10px',
        margin: '3%',
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
}));
