import React,{useState,useEffect,useCallback} from "react";
import axios from 'axios';

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
  const userId = localStorage.getItem('email').replace(/[@.]/g, "");
  let arr=[];

  const addExpenseHandler = (newExpense) => {
    console.log(newExpense);
    setExpense((prev) => {
      return [...prev, newExpense];
    });
  };
  const removeExpenseHandler = () => {};

  const getData = useCallback(async () => {
    const res = await axios.get(
      `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}.json`
    );
    for (const key in res.data) {
      arr.push(res.data[key]);
    }
    setExpense([...arr]);
  },[]);

  useEffect(() => {
    getData();
  }, []);


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