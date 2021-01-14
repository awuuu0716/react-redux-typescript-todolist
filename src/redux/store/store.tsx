import { configureStore } from '@reduxjs/toolkit';
import todosSlice from '../reducer/todoSlice';

export default configureStore({
  reducer: {
    todoList: todosSlice,
  },
});
