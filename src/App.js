import AuthForm from './Components/Auth/AuthForm';
import NavBar from './Components/Pages/NavBar'
import AuthContext from './Components/Store/Auth-Context';
import './App.css';
import { useContext } from 'react';
import Welcome from './Components/Pages/Welcome/Welcome';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <NavBar/>
      {!authCtx.isLoggedIn && <AuthForm/>}
    </div>
  );
}

export default App;
