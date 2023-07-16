import { createSlice } from "@reduxjs/toolkit";
import { expenseAction } from "./expenseSlice";

const initialAuthState = {isLoggedIn: !!localStorage.getItem('token'), token: localStorage.getItem('token')};
const authSlice = createSlice({
    name:'auth',
    initialState: initialAuthState,
    reducers: {
        login (state,action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('email',action.payload.email.replace(/[@.]/g, ""));
        },
        logout (state){
            state.isLoggedIn = false;
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            
        }
    }
})

export const authAction = authSlice.actions;
export default authSlice;
export const logoutAndClearExpense = () => {
    return (dispatch) => {
      dispatch(authAction.logout());
      dispatch(expenseAction.clearExpense());
    };
  };