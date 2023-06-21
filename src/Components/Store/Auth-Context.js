import React,{ useState,useCallback } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token,email) => {
        setToken(token);
        localStorage.setItem('token',token);
        
    }
    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');  
        
    },[])

   
    const authContext = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    );
}

export default AuthContext;