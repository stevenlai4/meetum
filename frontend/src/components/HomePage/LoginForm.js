import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
import { cognitoLogin } from '../../userAuth';
import { useHistory } from 'react-router-dom';

export default function LoginForm({ setUser, user, setIsAuthenticated }) {
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
        // borderRadius: '5px',
        // borderColor: 'gray',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        zIndex: '100',
    },
    submitButton: {
        color: '#FFF',
        fontWeight: 'bold',
        borderRadius: '20px',
        fontSize: '10px',
    },
}));
