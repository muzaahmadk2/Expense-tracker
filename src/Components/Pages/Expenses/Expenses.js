import React, { useContext } from "react";
import Card from "../../Card/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../../Store/themeSlice";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

const Expenses = (props) => {
  let amount = 0;
  const expenses = useSelector((state) => state.expense.expense);
  const toggle = useSelector((state) => state.theme.isToggle);
  const dispatch = useDispatch();

  const darkThemeHandler = () => {
    dispatch(themeAction.showToggle());
    dispatch(themeAction.setDark());
  };
  let arr=[];
  expenses.forEach((exp) => {
    amount += exp.amount;
    arr.push({
      Amount: exp.amount,
      Catogory: exp.category,
      Description: exp.description
    })
  });

  return (
    <Card>
      {amount >= 10000 ? (
        <div className="premButton">
          {toggle && (
            <CSVLink data={arr}>
              <Button variant="outline-success" className="download">🡇 Download file</Button>
            </CSVLink>
          )}
          <button onClick={darkThemeHandler}>Activate Premium</button>
        </div>
      ) : (
        ""
      )}
      {expenses.map((elem) => (
        <ExpenseItem elem={elem} key={Math.random().toString()}></ExpenseItem>
      ))}
    </Card>
  );
};

export default Expenses;
