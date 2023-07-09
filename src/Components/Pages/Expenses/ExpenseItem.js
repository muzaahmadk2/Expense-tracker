import React, { useContext } from "react";
import "./Expense.css";
import { Button } from "react-bootstrap";
import ExpenseContext from "../../Store/Expense-Context";

const ExpenseItem = (props) => {
  const expCtx = useContext(ExpenseContext);

  const editItemHandler = () =>{
    expCtx.editExpense(props.elem);
  }
  const deleteItemHandler = () => {
    expCtx.removeExpense(props.elem.id);
  }
  return (
    <div className="expenses">
  <div className="expdes"><span>{props.elem.description}</span></div>
  <div className="expCat"><span>{props.elem.category}</span></div>
  <div className="expAmount">
    <label className="moneyItemslabel">Rs.{props.elem.amount}</label>
</div>
<div  className="editDeleteButtons">
    <span ><Button variant="dark" onClick={editItemHandler}>Edit</Button></span>
    <span><Button variant="danger" onClick={deleteItemHandler}>Delete</Button></span>
    </div>
</div>

  );
}

export default ExpenseItem;