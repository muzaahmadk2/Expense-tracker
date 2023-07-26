import React, { useContext } from "react";
import "./Expense.css";
import { Button } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { expenseAction } from "../../Store/expenseSlice";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  const editItemHandler = () =>{
    dispatch(expenseAction.editExpense(props.elem));
  }
  const deleteItemHandler = () => {
    dispatch(expenseAction.removeExpense(props.elem.id));
  }
  return (
    <div className={isDark ? 'expensesDark' : 'expenses'}>
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