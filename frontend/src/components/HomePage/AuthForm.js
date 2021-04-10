import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
import {
    Card,
    Tabs,
    Tab,
    CardContent,
    CardHeader,
    Typography,
    Input,
    Button,
    IconButton,
    FormControl,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    const submit = (event) => {
        event.preventDefault();
        let result;

        if (tabValue === 0) {
            login({ type: 'login', username, password });
        } else {
            login({ type: 'signUp', email, username, password });
        }
    };

    return (
        <Card className={classes.root}>
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
                <form onSubmit={submit}>
                    {tabValue === 0 ? (
                        <Typography>
                            <FormControl fullWidth={true}>
                                <Input
                                    onChange={(event) =>
                                        setUseName(event.target.value)
                                    }
                                    className={classes.input}
                                    placeholder="Username"
                                ></Input>
                                <Input
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className={classes.input}
                                    type="password"
                                    placeholder="Password"
                                />
                                <Button
                                    type="submit"
                                    className={classes.postButton}
                                >
                                    SUMBIT
                                </Button>
                            </FormControl>
                        </Typography>
                    ) : (
                        <Typography>
                            <FormControl fullWidth={true}>
                                <Input
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className={classes.input}
                                    placeholder="Email"
                                    type="email"
                                ></Input>
                                <Input
                                    onChange={(event) =>
                                        setUseName(event.target.value)
                                    }
                                    className={classes.input}
                                    placeholder="Username"
                                ></Input>
                                <Input
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className={classes.input}
                                    type="password"
                                    placeholder="Password"
                                />
                                <Button
                                    type="submit"
                                    className={classes.postButton}
                                >
                                    SUMBIT
                                </Button>
                                {/* <Button component={Link} exact to={'/'} onClick={() => onSubmitSignUp({email: email, username: username, password:password,type: "signUp"})} className={classes.postButton} value="post">SUMBIT</Button> */}
                            </FormControl>
                        </Typography>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
