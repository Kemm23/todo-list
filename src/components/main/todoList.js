import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteTodo,
  isChecked,
  editTodo,
} from "../../store/reducers/todoSlice";
import clsx from "clsx";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [editJob, setEditJob] = useState("");
  const [isEditing, setIsEditing] = useState();

  const handleEditJob = (e, id, newTitle) => {
    if (e.target.value) {
      dispatch(editTodo({ id, newTitle }));
      setEditJob("");
      setIsEditing("");
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li
          key={index}
          className={clsx(
            todo.completed && "completed",
            isEditing === index && "editing"
          )}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => {
                dispatch(isChecked(index));
              }}
              checked={todo.completed}
            />
            <label
              onDoubleClick={() => {
                setIsEditing(index);
              }}
            >
              {todo.title}
            </label>
            <button
              className="destroy"
              onClick={() => dispatch(deleteTodo(index))}
            ></button>
          </div>
          <button className="cancel-edit" onClick={() => setIsEditing("")}>
            &times;
          </button>
          <input
            className="edit"
            value={editJob}
            onChange={(e) => setEditJob(e.target.value)}
            onKeyUp={(e) => {
              e.code === "Enter" && handleEditJob(e, index, editJob);
            }}
            onBlur={(e) => handleEditJob(e, index, editJob)}
            autoFocus
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
