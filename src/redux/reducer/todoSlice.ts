import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store/rootReducer';

export interface TodoData {
  id: number;
  content: string;
  isDone: boolean;
}

type Id = number;

type Content = string;

interface TodoState {
  todos: TodoData[];
  editId: number | undefined;
}

const initialState: TodoState = { todos: [], editId: undefined };

export const todosSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoData>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<Id>) => {
      state.todos = state.todos.filter((data) => data.id !== action.payload);
    },
    changeIsdone: (state, action: PayloadAction<Id>) => {
      state.todos = state.todos.map((data) =>
        data.id === action.payload ? { ...data, isDone: !data.isDone } : data
      );
    },
    changeEditId: (state, action: PayloadAction<Id>) => {
      state.editId = action.payload;
    },
    editTodo: (state, action: PayloadAction<Content>) => {
      state.todos = state.todos.map((data) =>
        data.id === state.editId ? { ...data, content: action.payload } : data
      );
    },
  },
});

export const {
  setTodos,
  deleteTodo,
  changeIsdone,
  changeEditId,
  editTodo,
} = todosSlice.actions;

// type A = ReturnType<typeof setTodos>;

export const selectTodos = (state: RootState) => state.todoList.todos;

export const selectEditId = (state: RootState) => state.todoList.editId;

export default todosSlice.reducer;
