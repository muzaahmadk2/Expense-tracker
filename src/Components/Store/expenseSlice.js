import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialExpenseState = {expense: [],editingExpense: '',isEditing:false}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialExpenseState,
    reducers: {
        addExpense(state,action) {
           state.expense.push(action.payload);
        },
        getData(state,action){
            console.log(action.payload);
            for(let i in action.payload){
                state.expense.push(action.payload[i]);
            }
        },
        removeExpense(state,action){
            const userId = localStorage.getItem('email');
            const id = action.payload;
            try {
                axios.delete(
                  `https://expense-36902-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`
                );
                  state.expense = state.expense.filter((itm) => itm.id !== id);
              } catch (error) {
                alert(error);
              }
        },
        editExpense(state,action){
            state.isEditing = true;
            state.editingExpense = action.payload;
            state.expense = state.expense.filter((itm) => itm.id !== action.payload.id);
        },
        finishEdit(state){
            state.isEditing = false;
            state.editingExpense = null;
        },
        clearExpense(state){
            state.expense = [];
        }
        
    } 
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice;