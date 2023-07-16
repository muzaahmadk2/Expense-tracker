import React, { useContext, useState } from "react";
import { Route, Link,useNavigate, Routes } from "react-router-dom";
import "./Welcome.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";


function Welcome() {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const addExpenseHandler = () => {
    navigate('/addexpenses')
  }
 
  const verifyEmailHandler = () => {

    let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB9ZONkhe98ETh530TgqVIj63rXXVIWPDs";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("Email Verification Send");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div>
    <div className="welcome">
      <span >
        Welcome To Expense Tracker!!!
      </span>
      <span >
        Your profile is incomplete <Link to="/profile">Complete Now</Link>
      </span>
      <div className="verify">
      <Button variant="outline-info"  onClick={verifyEmailHandler}>Verify Your Email</Button>
      </div>
    </div>
    <section className="addExpense">
      <button onClick={addExpenseHandler}>Add Expense </button> 
    </section>

    </div>
  );
}

export default Welcome;
