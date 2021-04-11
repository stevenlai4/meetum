import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function GuardedRoute({
    component: Component,
    isAuthenticated,
    setIsAuthenticated,
    path,
}) {
    return (
        <Route path={path}>
            {isAuthenticated ? (
                <Component
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
            ) : (
                <Redirect to="/" />
            )}
        </Route>
    );
}
