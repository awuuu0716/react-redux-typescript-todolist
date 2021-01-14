import { combineReducers } from '@reduxjs/toolkit';
import todosSlice from 'redux/reducer/todoSlice';

const rootReducer = combineReducers({
  todoList: todosSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
