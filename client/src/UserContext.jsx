/* eslint-disable react/prop-types */
// AuthContext.js
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const logout = async () => {
        try {
            await axios.post('/logout');
            setCookie('token', '');
            setIsLoggedIn(false);
            setUser(null);
            window.localStorage.removeItem('user');
            removeCookie('token');
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(() => {
        if (cookies.token) {
            axios.get('/profile',{
                headers: {
                    Authorization: `${cookies.token}`,
                },
            }).then((res) => {
                setUser(res.data.user);
                setIsLoggedIn(true);
            });
        }
    }, [cookies.token]);
    return (
    <AuthContext.Provider value={{ isLoggedIn, logout, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };