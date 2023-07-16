
import React, { useContext } from "react";
import Card from "../../Card/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";
import { useSelector } from "react-redux";

const Expenses = (props) => {
  let amount = 0;
  const expenses = useSelector(state => state.expense.expense);
  expenses.forEach((exp) => {
      amount += exp.amount;
  })
  return (
    <Card>
      {amount >= 10000 ? <div className="premButton">
        <button>Activate Premium</button>
      </div> : ''}
      {expenses.map((elem) => (
        <ExpenseItem elem={elem} key={Math.random().toString()}></ExpenseItem>
      ))}
    </Card>
  );
}

export default Expenses;