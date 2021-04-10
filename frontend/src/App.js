import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Home from './layouts/Home';
import GuardedRoute from './components/GuardedRoute';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateUser = (authState) => {
        setIsAuthenticated(authState);
    };

    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard Page</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home setIsAuthenticated={setIsAuthenticated} />
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
