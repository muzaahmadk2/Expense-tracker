import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ExpenseContext from "../../Store/Expense-Context";
import "./AddExpenseForm.css";
import Expenses from '../Expenses/Expenses';

const AddExpenseForm =() => {
  const expCtx = useContext(ExpenseContext);
  const [isExpense, setIsExpense] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const addExpenseSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    if (
      enteredAmount.trim().length < 0 ||
      enteredDescription.length < 1 ||
      enteredCategory == "Category"
    ) {
      alert("Please enter all fields correctly");
      return;
    }
    const newexp = {
      amount: +enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    console.log("clicked");
    expCtx.addExpense({ ...newexp });
    // setIsExpense(true);
  };

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
            Submit
          </Button></div>
        </Form>
      </Container>
      {expCtx.isExpense && <Expenses />}
    </>
  );
}

export default AddExpenseForm;