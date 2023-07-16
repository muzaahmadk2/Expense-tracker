import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./AddExpenseForm.css";
import Expenses from '../Expenses/Expenses';
import axios from 'axios';
import { useDispatch,useSelector } from "react-redux";
import { expenseAction } from "../../Store/expenseSlice";

const AddExpenseForm =() => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();
  const editingExpense = useSelector(state => state.expense.editingExpense);
  const isEditing = useSelector(state => state.expense.isEditing);
  const userId = localStorage.getItem('email');

  const addExpenseSubmitHandler = (e) => {
    e.preventDefault();    
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    if (
      enteredAmount.trim().length < 0 ||
      enteredDescription.length < 1 ||
      enteredCategory === "Category"
    ) {
      alert("Please enter all fields correctly");
      return;
    }
    const newexp = {
      amount: +enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    
    const newExp = JSON.stringify(newexp);
    if(!isEditing){
    try {
      axios.post(
        `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}.json`,
        newExp
      ).then((res => dispatch(expenseAction.addExpense({...newexp,id:res.data.name}))));
      
    } catch (error) {
      alert(error);
    }
    
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  }else{
    try {
      axios.put(
        `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}/${editingExpense.id}.json`,
        newExp
      ).then((res => dispatch(expenseAction.addExpense({...res.data, id:editingExpense.id}))));

    } catch (error) {
      alert(error);
    }
    dispatch(expenseAction.finishEdit());
    
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  }
}
  if(isEditing){
    amountRef.current.value = editingExpense.amount;
    descriptionRef.current.value = editingExpense.description;
    categoryRef.current.value = editingExpense.category;
  }
  const getData = async () => {
      let arr = [];
      const res = await axios.get(
        `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}.json`
      );

      for (const key in res.data) {
        arr.push({ ...res.data[key], id: key });
      }
      
      dispatch(expenseAction.getData([...arr]))
    }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
      <Container className="addExpenseDiv">
        <h2>Expense Tracker</h2>

        <Form onSubmit={addExpenseSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="addExpenseLabel">Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Amount"
              className="addExpenseInput"
              ref={amountRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="addExpenseLabel">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              className="addExpenseInput"
              ref={descriptionRef}
            />
          </Form.Group>
          <br />
          <Form.Select
            aria-label="Default select example"
            className="addExpenseInput"
            ref={categoryRef}
          >
            <option>Category</option>
            <option value="Food">Food</option>
            <option value="Movies">Movies</option>
            <option value="Fuel">Fuel</option>
            <option value="salary">salary</option>
            <option value="other">Others</option>
          </Form.Select>
          <br />
          <div className="addExpenseButton">
          <Button variant="dark" type="submit" >
            {!isEditing ? "Submit" : "Update"}
          </Button></div>
        </Form>
      </Container>
      <Expenses />
    </>
  );
}

export default AddExpenseForm;