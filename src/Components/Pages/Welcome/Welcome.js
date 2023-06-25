import React from "react";
import { Route, Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome">
      <span >
        Welcome To Expense Tracker!!!
      </span>
      <span >
        Your profile is incomplete <Link to="/profile">Complete Now</Link>
      </span>
    </div>
  );
}

export default Welcome;
