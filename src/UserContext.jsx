import React, { useState } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoadin] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoadin(true);
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token invalido');
                    await getUser(token);
                } catch (err) {
                    userLogout();
                } finally {
                    setLoadin(false);
                }
            }
        };
        autoLogin();
    }, []);

    async function getUser(token) {
        const {url, options} = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setLogin(true);
        console.log(json);
        
    }

    async function userLogin(username, password) {
        try {
            setError(null);
            setLoadin(true);
            const {url, options} = TOKEN_POST({username, password});
            const tokenResp = await fetch(url, options);
            if (!tokenResp.ok) throw new Error(`Error: ${tokenResp.statusText}`);
            const {token} = await tokenResp.json();
            window.localStorage.setItem('token', token)
            await getUser(token);
        } catch (err) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoadin(false);
        }
    }

    async function userLogout() {
        setData(null);
        setError(null);
        setLoadin(false);
        setLoadin(false);
        window.localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{userLogin, userLogout, data, error, loading, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext