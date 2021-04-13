import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';

// If starting the server as a development environment then it's
// going to import dotenv extension
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: process.env.REACT_APP_COGNITO_REGION,
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
    },
});

ReactDOM.render(<App />, document.getElementById('root'));
