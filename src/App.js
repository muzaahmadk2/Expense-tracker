import AuthForm from './Components/Auth/AuthForm';
import NavBar from './Components/Pages/NavBar'
import AuthContext from './Components/Store/Auth-Context';
import './App.css';
import React, { useContext } from 'react';
import Welcome from './Components/Pages/Welcome/Welcome';
import ForgotPass from './Components/Pages/Forgot/ForgotPass';
import { Route,Routes,useNavigate } from 'react-router-dom';

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <NavBar/>
      {/* {!authCtx.isLoggedIn && navigate('/')} */}
      <Routes>
      {!authCtx.isLoggedIn &&<Route path='/' exact element={<AuthForm/>} />}
      {!authCtx.isLoggedIn &&<Route path="/forgotpassword" element={<ForgotPass />} />}
      </Routes>
    </React.Fragment>
  );
}

export default App;
