import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Home from './layouts/Home';
import GuardedRoute from './components/GuardedRoute';
import { refreshAuthToken } from './userAuth';
import useLocalStorage from 'react-use-localstorage';
import { Redirect } from 'react-router-dom';
import CreateEvent from './layouts/CreateEvent';
import EventDetail from './layouts/EventDetail';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );

    //Refresh Cognito Auth Token
    useEffect(() => {
        (async () => {
            try {
                await refreshAuthToken(setIsAuthenticated);
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {/* Redirect to dashboard if user has already login (isAithorized) otherwise redirect to home page to login*/}
                    {localStorage.getItem('isAuthorized') === 'true' ? (
                        <Redirect from="/" to="/dashboard" />
                    ) : (
                        <Home setIsAuthenticated={setIsAuthenticated} />
                    )}
                </Route>
                <GuardedRoute
                    path="/dashboard"
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    component={Dashboard}
                />
                <GuardedRoute
                    path="/createEvent"
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    component={CreateEvent}
                />
                <GuardedRoute
                    path="/event/:event_id"
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    component={EventDetail}
                />
            </Switch>
        </Router>
    );
}
