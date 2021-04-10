import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function GuardedRoute({
    component: Component,
    isAuthenticated,
    path,
}) {
    return (
        <Route path={path}>
            {isAuthenticated ? (
                <UserProvider isAuthenticated={isAuthenticated}>
                    <Component />
                </UserProvider>
            ) : (
                <Redirect to="/" />
            )}
        </Route>
    );
}
