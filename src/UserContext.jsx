import React, { useState } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token invalido');
                    await getUser(token);
                } catch (err) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
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
            setLoading(true);
            const {url, options} = TOKEN_POST({username, password});
            const tokenResp = await fetch(url, options);
            if (!tokenResp.ok) throw new Error(`Error: ${tokenResp.statusText}`);
            const {token} = await tokenResp.json();
            window.localStorage.setItem('token', token)
            await getUser(token);
            navigate('/conta');
        } catch (err) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function userLogout () {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem('token');
    }

    // const userLogout = React.useCallback(async function () {
    //     setData(null);
    //     setError(null);
    //     setLoadin(false);
    //     setLoadin(false);
    //     window.localStorage.removeItem('token');
    //     navigate('/login');
    // }, [navigate]);
    
    return (
        <UserContext.Provider value={{userLogin, userLogout, data, error, loading, login}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext