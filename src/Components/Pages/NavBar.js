import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import classes from "./NavBar.module.css";
import Welcome from "./Welcome/Welcome";
import Profile from "./Profile/Profile";
import AddExpenseForm from "../Pages/AddExpenses/AddExpenseForm";
import { useSelector, useDispatch } from "react-redux";
import { logoutAndClearExpense } from "../Store/authSlice";
import { themeAction } from "../Store/themeSlice";


function MyNavbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDark = useSelector((state) => state.theme.isDark);
  const toggle = useSelector((state) => state.theme.isToggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutAndClearExpense());
    navigate("/");
  };
  const toggleHandler = () => {
    if (isDark) {
      dispatch(themeAction.setLight());
    } else {
      dispatch(themeAction.setDark());
    }
  };
  return (
    <div>
      <Navbar
        bg={isDark ? "dark" : "light"}
        variant={isDark ? "dark" : "light"}
      >
        <Container>
          <Navbar.Brand className={classes.myweb}>MyWebLink</Navbar.Brand>

          <Nav className="me-auto " bg="dark" variant="dark">
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "/home" : "/"}
              className={classes.titlelabels}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to={isLoggedIn ? "/products" : "/"}
              className={classes.titlelabels}
              as={Link}
            >
              Products
            </Nav.Link>
            <Nav.Link
              to={isLoggedIn ? "/about" : "/"}
              className={classes.titlelabels}
              as={Link}
            >
              About Us
            </Nav.Link>
            {isLoggedIn && (
              <button
                className={classes.button}
                onClick={logoutHandler}
                style={{ color: isDark ? "white" : "black" }}
              >
                Logout
              </button>
            )}
            {toggle && (
              <Button
                variant={!isDark ? "outline-dark" : "outline-light"}
                onClick={toggleHandler}
                style={{ marginLeft: "400px" }}
              >
                {!isDark ? "Dark Mode" : "Light Mode"}{" "}
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        {isLoggedIn && <Route path="/" element={<Welcome />} />}
        {isLoggedIn && <Route path="/home" element={<Welcome />} />}
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {isLoggedIn && (
          <Route path="/addexpenses" element={<AddExpenseForm />} />
        )}
      </Routes>

      <div className={classes.margin}></div>
    </div>
  );
}

export default MyNavbar;
