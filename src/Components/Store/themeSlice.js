import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {isDark: false, isToggle: false};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers : {
        showToggle (state){
            state.isToggle = !state.isToggle;
        },
        setDark (state){
            const link = document.getElementById('themeStylesheet');
            const div = document.getElementById('root');
            div.style.backgroundColor='#282c34';
            div.style.color='#f7f7f7'
            link.href = '/dark-theme.css';
            state.isDark = !state.isDark;
        },
        setLight (state) {
            const link = document.getElementById('themeStylesheet');
            const div = document.getElementById('root');
            div.style.backgroundColor='#f7f7f7';
            div.style.color=''
            link.href = '/light-theme.css';
            state.isDark = !state.isDark;
        }
    }
})

export const themeAction = themeSlice.actions;
export default themeSlice;