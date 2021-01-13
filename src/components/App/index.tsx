import React, { FormEventHandler, useCallback, useState } from 'react';

interface TodoData {
  id: number;
  content: string;
  isDone: boolean;
}

const TodoList: React.FC<{
  todos: TodoData[];
  handleDoneOrResumeBtn: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
}> = ({ todos, handleDoneOrResumeBtn, deleteTodo, editTodo }) => {
  return (
    <div>
      {todos.map((todo: TodoData) => (
        <div key={todo.id}>
          <div>{todo.isDone ? <s>{todo.content}</s> : todo.content}</div>
          <button onClick={() => handleDoneOrResumeBtn(todo.id)}>
            {todo.isDone ? 'Resume' : 'Done'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>delete #{todo.id}</button>
          <button onClick={() => editTodo(todo.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

interface HelloProps {
  name: string;
}

let id = 0;

const App = (props: HelloProps) => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      if (isEditing) {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === editId ? { ...todo, content: inputValue } : todo
          )
        );
        setIsEditing(false);
      } else {
        setTodos((v) => [...v, { id, content: inputValue, isDone: false }]);
        id += 1;
      }
      setInputValue('');
    },
    [inputValue, isEditing, editId]
  );

  const handleDoneOrResumeBtn = useCallback((id: number) => {
    setTodos((todo) =>
      todo.map((todoData) =>
        todoData.id === id
          ? { ...todoData, isDone: !todoData.isDone }
          : todoData
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((todo) => todo.filter((todoData) => todoData.id !== id));
  }, []);

  const editTodo = useCallback(
    (id: number) => {
      const todo = todos.find((todo) => todo.id === id);

      if (todo) {
        setInputValue(todo.content);
        setIsEditing(true);
        setEditId(id);
      }
    },
    [todos]
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
          handleDoneOrResumeBtn={handleDoneOrResumeBtn}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </>
  );
};

export default App;
