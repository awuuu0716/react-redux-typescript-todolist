import { createSlice } from '@reduxjs/toolkit';

interface TodoData {
  id: number;
  content: string;
  isDone: boolean;
}

interface initStateType {
  todos: TodoData[];
  editId: number | undefined;
}

const initialState: initStateType = { todos: [], editId: undefined };

export const todosSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((data) => data.id !== action.payload);
    },
    changeIsdone: (state, action) => {
      state.todos = state.todos.map((data) =>
        data.id === action.payload ? { ...data, isDone: !data.isDone } : data
      );
    },
    changeEditId: (state, action) => {
      state.editId = action.payload;
    },
    editTodo: (state, action) => {
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

interface State {
  todoList: initStateType;
}

export const selectTodos = (state: State) => state.todoList.todos;

export const selectEditId = (state: State) => state.todoList.editId;

export default todosSlice.reducer;
