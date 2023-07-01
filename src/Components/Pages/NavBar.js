import React,{useContext} from "react";
import AuthContext from "../Store/Auth-Context";
import { Route,Routes } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import classes from "./NavBar.module.css";
import Welcome from "./Welcome/Welcome";
import Profile from "./Profile/Profile";


function MyNavbar() {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
      authCtx.logout();
    }
  return (
    <div>
      <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand  className={classes.myweb}>
            MyWebLink
          </Navbar.Brand>

          <Nav className="me-auto " bg="dark" variant="dark">
            <Nav.Link
              as={Link}
              to="/home"
              className={classes.titlelabels}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to="/products"
              className={classes.titlelabels}
              as={Link}
            >
              Products
            </Nav.Link>
            <Nav.Link
              to="/about"
              className={classes.titlelabels}
              as={Link}
            >
              About Us
            </Nav.Link>
            {isLoggedIn && <button className={classes.button} onClick={logoutHandler} >Logout</button>}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
      {isLoggedIn && <Route path="/" element={<Welcome/>} />}
      {isLoggedIn && <Route path="/home" element={<Welcome/>} />}
      {isLoggedIn && <Route path="/profile" element={<Profile />} />}
      </Routes>
      
      <div className={classes.margin}></div>
    </div>
  );
}

export default MyNavbar;