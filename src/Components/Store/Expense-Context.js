import React,{useState,useEffect,useCallback} from "react";
import axios from 'axios';

const ExpenseContext = React.createContext({
    expenses: [],
    isExpense:false,
    editingExpense:{},
    isEditing:false,
    login:()=>{},
    logout:()=>{},
    updateExpense:()=> {},
    addExpense: (exp) => {},
    removeExpense: (id) => {},
    editExpense: (elem) => {},
  });
  export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const isExpense = !! expense;
  const isEditing = !! editingExpense;
  const email = localStorage.getItem('email');
  let userId;
  if(email){
    userId = email;
  }
 
  
  const loginHandler = () =>{
    getData();
  }
  const addExpenseHandler = (newExpense) => {
    console.log(newExpense);
    // getData();
    setExpense([...expense,newExpense]);
  };
  const removeExpenseHandler = (id) => {
    try {
      axios.delete(
        `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`
      );
      // const existingItemIndex = expense.findIndex(
      //   (itm) => itm.id === id)
        setExpense(expense.filter((itm) => itm.id !== id));
    } catch (error) {
      alert(error);
    }
  };
  const editExpenseHandler = (elem) => {
    setEditingExpense(elem);
    setExpense(expense.filter((itm) => itm.id !== elem.id));
  };
  const updateExpenseHandler = () =>{
    setEditingExpense(null);
  }
  const logoutHandler = () => {
    setExpense([]);
    userId = '';
  }
  const getData = useCallback(async () => {
      let arr = [];
      const res = await axios.get(
        `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}.json`
      );

      for (const key in res.data) {
        arr.push({ ...res.data[key], id: key });
      }
      console.log(arr);
      setExpense([...arr]);
  },[userId]);


  useEffect(() => {
    if (userId) {
      getData();
      console.log("useEffect called");
    }
  },[userId]);


  const expensesValue = {
    expenses: expense,
    isExpense:isExpense,
    editingExpense:editingExpense,
    isEditing:isEditing,
    login:loginHandler,
    logout:logoutHandler,
    updateExpense:updateExpenseHandler,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    editExpense:editExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expensesValue}>
      {props.children}
    </ExpenseContext.Provider>
  )
}