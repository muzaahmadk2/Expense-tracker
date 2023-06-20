import { Button, Card, Container, Form } from "react-bootstrap";
import classes from "./AuthForm.module.css";
import { useState, useRef } from "react";

const AuthForm = (props) => {
  const [isSignUp, setIsSignUp] = useState(true);
//   const [isError, setIsError] = useState("");
  const emailRef = useRef("");
  const passRef = useRef("");
  const passCRef = useRef("");

  const authModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;
    const enteredCPass = passCRef.current.value;
    if(enteredPass.length < 6){
        return alert("Password must contain 6 digits");
    }
    else if(enteredPass !== enteredCPass){
        return alert("Password doesn't match");
    }
    else{
        
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
            emailRef.current.value = '';
            passRef.current.value= '';
            passCRef.current.value= '';
          })
          .catch((err) => {
            alert(err.message);
          });
    }
  }

  return (
    <>
      <Card className={classes.Card}>
        <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"  required placeholder="Enter email" ref={emailRef}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"  required placeholder="Password" ref={passRef}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"  required placeholder="Confirm Password" ref={passCRef}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            {isSignUp ? "Sign Up" : "Log In"}
          </Button>
        </Form>
      </Card>
      <section type="button" className={classes.section} onClick={authModeHandler}>
        <button>
          {isSignUp ? "Have an account ? Log In" : "Create a new account"}
        </button>
      </section>
    </>
  );
};
export default AuthForm;
