import React, { FormEventHandler, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodos,
  deleteTodo,
  changeIsdone,
  editTodo,
  selectTodos,
  selectEditId,
  changeEditId,
} from 'redux/reducer/todoSlice';

interface TodoData {
  id: number;
  content: string;
  isDone: boolean;
}

const TodoList: React.FC<{
  todos: TodoData[];
  handleChangeIsDone: (id: number) => void;
  handelDeleteTodo: (id: number) => void;
  handleEditBtn: (id: number) => void;
}> = ({ todos, handelDeleteTodo, handleChangeIsDone, handleEditBtn }) => {
  return (
    <div>
      {todos.map((todo: TodoData) => (
        <div key={todo.id}>
          <div>{todo.isDone ? <s>{todo.content}</s> : todo.content}</div>
          <button onClick={() => handleChangeIsDone(todo.id)}>
            {todo.isDone ? 'Resume' : 'Done'}
          </button>
          <button onClick={() => handelDeleteTodo(todo.id)}>
            delete #{todo.id}
          </button>
          <button onClick={() => handleEditBtn(todo.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

interface HelloProps {
  name: string;
}

let id = 1;

const App = (props: HelloProps) => {
  // const [todos, setTodos] = useState<TodoData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const editId = useSelector(selectEditId);
  console.log(todos);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      if (editId) {
        dispatch(editTodo(inputValue));
      } else {
        dispatch(setTodos({ id, content: inputValue, isDone: false }));
        id += 1;
      }
      setInputValue('');
    },
    [inputValue, editId, dispatch]
  );

  const handleChangeIsDone = useCallback(
    (id: number) => {
      dispatch(changeIsdone(id));
    },
    [dispatch]
  );

  const handelDeleteTodo = useCallback(
    (id: number) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const handleEditBtn = useCallback(
    (id: number) => {
      const todo = todos.find((todo) => todo.id === id);

      if (todo) {
        setInputValue(todo.content);
        dispatch(changeEditId(id));
      }
    },
    [todos, dispatch]
  );

  return (
    <>
      <h1>Hello {props.name}</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button>Submit</button>
        </form>
        <TodoList
          todos={todos}
          handleChangeIsDone={handleChangeIsDone}
          handelDeleteTodo={handelDeleteTodo}
          handleEditBtn={handleEditBtn}
        />
      </div>
    </>
  );
};

export default App;
