import { Auth } from 'aws-amplify';

// Get user idToken (JWT)
export async function userToken() {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (!currentUser) {
            throw Error('User not logged in');
        }

        const session = await Auth.currentSession();
        return session.getIdToken().getJwtToken();
    } catch (error) {
        console.error(error);
    }
}

//get user info for cognito
export async function getUserInfo() {
    try {
        const userInfo = await Auth.currentUserInfo();
        return userInfo;
    } catch (error) {
        console.error(error);
    }
}

//register user from cognito
export async function cognitoRegister({ email, password, name }) {
    try {
        const { userSub } = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                name: name,
            },
        });
        return userSub;
    } catch (error) {
        throw error;
    }
}

//Login user from cognito
export async function cognitoLogin({ email, password }) {
    try {
        const user = await Auth.signIn({
            username: email,
            password: password,
        });
        return user;
    } catch (error) {
        throw error;
    }
}

//Auth.currentSession() to get current valid token or get the new if current has expired
//Keep updating your tokens on some interval
export async function refreshAuthToken(setIsAuthenticated) {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        if (cognitoUser && currentSession) {
            cognitoUser.refreshSession(
                currentSession.refreshToken,
                (err, session) => {
                    if (err) {
                        console.error(err);
                    }
                    setIsAuthenticated(true);
                }
            );
        }
    } catch (e) {
        setIsAuthenticated(false);
        throw e;
    }
}
