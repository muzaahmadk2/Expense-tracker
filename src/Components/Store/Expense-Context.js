import React,{useState} from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    isExpense:false,
    addExpense: (exp) => {},
    removeExpense: () => {},
  });
  export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([]);
  const isExpense = !! expense;

  const addExpenseHandler = (newExpense) => {
    console.log(newExpense);
    setExpense((prev) => {
      return [...prev, newExpense];
    });
  };
  const removeExpenseHandler = () => {};


  const expensesValue = {
    expenses: expense,
    isExpense:isExpense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expensesValue}>
      {props.children}
    </ExpenseContext.Provider>
  )
}