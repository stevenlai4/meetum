import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
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

export default function AuthForm({ login }) {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    const [username, setUseName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitForm = (event) => {
        event.preventDefault();

        if (tabValue === 0) {
            login({ type: 'login', username, password });
        } else {
            login({ type: 'signUp', email, username, password });
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
                    <form onSubmit={submitForm}>
                        {tabValue === 0 ? (
                            <div>
                                <FormControl fullWidth={true}>
                                    <Input
                                        onChange={(event) =>
                                            setUseName(event.target.value)
                                        }
                                        className={classes.input}
                                        placeholder="Username"
                                        autoComplete="on"
                                    ></Input>
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <Input
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className={classes.input}
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="on"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    className={classes.postButton}
                                >
                                    SUMBIT
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <FormControl fullWidth={true}>
                                    <Input
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        className={classes.input}
                                        placeholder="Email"
                                        type="email"
                                    ></Input>
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <Input
                                        onChange={(event) =>
                                            setUseName(event.target.value)
                                        }
                                        className={classes.input}
                                        placeholder="Username"
                                        autoComplete="on"
                                    ></Input>
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <Input
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className={classes.input}
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="on"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    className={classes.postButton}
                                >
                                    SUMBIT
                                </Button>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
