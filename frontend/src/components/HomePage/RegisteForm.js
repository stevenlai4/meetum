import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';

export default function RegisterForm({ user, setUser }) {
    const classes = useStyles();

    return (
        <>
            <FormControl fullWidth={true}>
                <input
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
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <input
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
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <input
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
                <input
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
            <div className={classes.button}>
                <Button
                    type="submit"
                    variant="outlined"
                    className={classes.submitButton}
                >
                    Submit
                </Button>
            </div>
        </>
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
    },
    submitButton: {
        color: '#FFF',
        fontWeight: 'bold',
        borderRadius: '20px',
        fontSize: '10px',
    },
}));
