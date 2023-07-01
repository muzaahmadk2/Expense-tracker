import React from "react";
import "./Expense.css";

const ExpenseItem = (props) => {
  return (
    <div className="expenses">
      <div className="expdes"><span >{props.elem.description}</span></div>
      <div className="expCat"><span >{props.elem.category}</span></div>
      <div><span className="expAmount">
        <label className="moneyItemslabel">Rs.{props.elem.amount}</label>
      </span></div>
      
      <hr />
    </div>
  );
}

export default ExpenseItem;