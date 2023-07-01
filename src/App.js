import AuthForm from './Components/Auth/AuthForm';
import NavBar from './Components/Pages/NavBar'
import AuthContext from './Components/Store/Auth-Context';
import './App.css';
import React, { useContext } from 'react';
import Welcome from './Components/Pages/Welcome/Welcome';
import ForgotPass from './Components/Pages/Forgot/ForgotPass';
import { Route,Routes,redirect } from 'react-router-dom';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <NavBar/>
      {!authCtx.isLoggedIn && <redirect to='/' />}
      <Routes>
      {!authCtx.isLoggedIn &&<Route path='/' exact element={<AuthForm/>} />}
      {!authCtx.isLoggedIn &&<Route path="/forgotpassword" element={<ForgotPass />} />}
      </Routes>
    </React.Fragment>
  );
}

export default App;
