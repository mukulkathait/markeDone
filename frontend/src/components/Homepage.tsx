import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Homepage() {
  const [todos, setTodos] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        if (response.data.success) {
          setTodos(response.data.data);
          console.log(response.data.data);
          console.log(todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  async function handleEdit() {
    //
  }

  async function handleDelete() {
    try {
    } catch (error) {
      console.log("error during todo deletion", error);
    }
  }

  return (
    <>
      <div>Header</div>
      {todos &&
        todos.map((todo: any) => (
          <div key={todo.id} className="flex gap-2">
            <label htmlFor={todo.id}>
              <input type="checkbox" id={todo.id} value={todo.title} />
              {todo.title}
            </label>
            <button onClick={handleEdit}>_edit</button>
            <button onClick={handleDelete()}>_delete</button>
          </div>
        ))}
    </>
  );
}

export default Homepage;
