import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './layouts/Home';
import Protected from './layouts/Dashboard';

export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Protected - dashboard Page</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/dashboard">
                    <Protected />
                </Route>
            </Switch>
        </Router>
    );
}
