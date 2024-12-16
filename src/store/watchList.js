import { createSlice } from '@reduxjs/toolkit';

let ideas = JSON.parse(localStorage.getItem('watchList')) || [];

export const watchList = createSlice({
  name: 'watchList',
  initialState: {
    ideas,
  },
  reducers: {
    Add: (state, action) => {
      if (!state.ideas.includes(action.payload)) {
        state.ideas.push(action.payload); 
        localStorage.setItem('watchList', JSON.stringify(state.ideas));
      }
    },
    Remove: (state, action) => {
      state.ideas = state.ideas.filter(id => id !== action.payload);
      
      localStorage.setItem('watchList', JSON.stringify(state.ideas));
    },
  },
});

export const { Add, Remove } = watchList.actions;
export default watchList.reducer;
