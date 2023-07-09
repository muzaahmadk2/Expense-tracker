import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useState, useRef, useContext } from "react";
import AuthContext from "../Store/Auth-Context";
import ExpenseContext from "../Store/Expense-Context";


const AuthForm = (props) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const expCtx = useContext(ExpenseContext);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passRef = useRef("");
  const passCRef = useRef("");

  const authModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const passModeHandler = () => {
    setIsPassVisible((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;
    if (enteredPass.length < 6) {
      return alert("Password must contain 6 digits");
    } else if (isSignUp && enteredPass !== passCRef.current.value) {
      return alert("Password doesn't match");
    } else {
      let url;
      if (!isSignUp) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9ZONkhe98ETh530TgqVIj63rXXVIWPDs";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9ZONkhe98ETh530TgqVIj63rXXVIWPDs";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true,
        }),
        header: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("user signed up");
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.idToken,enteredEmail);
          expCtx.login();
          emailRef.current.value = "";
          passRef.current.value = "";
          if (isSignUp) {
            passCRef.current.value = "";
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const forgotPasswordHandler = () => {
    navigate("/forgotpassword");
  };

  return (
    <div>
      <img
        src={require("./blue.jpg")}
        alt="img"
        className={classes.backgroundDiv}
      />
      <div className={classes.loginBox}>
        <Card className={classes.Card}>
          <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                ref={emailRef}
                style={{
                  backgroundColor: isSignUp ? "" : "black",
                  color: isSignUp ? "" : "white",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={isPassVisible ? "text" : "password"}
                required
                placeholder="Password"
                ref={passRef}
                style={{
                  backgroundColor: isSignUp ? "" : "black",
                  color: isSignUp ? "" : "white",
                }}
                onClick={passModeHandler}
              />
            </Form.Group>
            {isSignUp && (
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Confirm Password"
                  ref={passCRef}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
            <div className={classes.forgotPass}>
              <Button
                variant="link"
                onClick={forgotPasswordHandler}
              >
                Forgot password?
              </Button>
            </div>
          </Form>
        </Card>
        <section
          type="button"
          className={classes.section}
          onClick={authModeHandler}
        >
          <button>
            {isSignUp
              ? "Have an account ? Log In"
              : "Dont have an account ? Sign Up"}
          </button>
        </section>
      </div>
    </div>
  );
};
export default AuthForm;
