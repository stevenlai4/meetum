import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Home from './layouts/Home';
import GuardedRoute from './components/GuardedRoute';
import { refreshAuthToken } from './userAuth';
import useLocalStorage from 'react-use-localstorage';
import { Redirect } from 'react-router-dom';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );

    useEffect(() => {
        (async () => {
            try {
                await refreshAuthToken(setIsAuthenticated);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {localStorage.getItem('isAuthorized') ? (
                        <Redirect from="/" to="/dashboard" />
                    ) : (
                        <Home setIsAuthenticated={setIsAuthenticated} />
                    )}
                </Route>
                <GuardedRoute
                    path="/dashboard"
                    isAuthenticated={isAuthenticated}
                    component={Dashboard}
                />
            </Switch>
        </Router>
    );
}
