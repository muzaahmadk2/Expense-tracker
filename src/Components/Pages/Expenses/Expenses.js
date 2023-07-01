
import React, { useContext } from "react";
import Card from "../../Card/Card";
import ExpenseContext from "../../Store/Expense-Context";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";
const Expenses = (props) => {
  const expCtx = useContext(ExpenseContext);
  return (
    <Card>
      {expCtx.expenses.map((elem) => (
        <ExpenseItem elem={elem} key={Math.random().toString()}></ExpenseItem>
      ))}
    </Card>
  );
}

export default Expenses;