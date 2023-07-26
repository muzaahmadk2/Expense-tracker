import AuthForm from './Components/Auth/AuthForm';
import NavBar from './Components/Pages/NavBar'
// import AuthContext from './Components/Store/Auth-Context';
import './App.css';
// import './dark-theme.css';
import React, { useContext } from 'react';
import Welcome from './Components/Pages/Welcome/Welcome';
import ForgotPass from './Components/Pages/Forgot/ForgotPass';
import { Route,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector( state => state.auth.isLoggedIn);
  return (
    <div > 
      <NavBar/>
      <Routes>
      {!isLoggedIn &&<Route path='/' exact element={<AuthForm/>} />}
      {!isLoggedIn &&<Route path="/forgotpassword" element={<ForgotPass />} />}
      </Routes>
    </div>
  );
}

export default App;
