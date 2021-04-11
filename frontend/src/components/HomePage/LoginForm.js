import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button, FormControl } from '@material-ui/core';

export default function LoginForm({ setUser, user }) {
    const classes = useStyles();

    return (
        <>
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
            <Button type="submit" className={classes.postButton}>
                Submit
            </Button>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        width: '80%',
        margin: '30px auto 30px auto',
    },
    postButton: {
        color: '#3f51b5',
        fontWeight: 'bold',
    },
}));
