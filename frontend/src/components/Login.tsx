import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const client = axios.create({
  baseURL: "http://localhost:5000/",
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginInfo, setUserLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  async function onSubmitHandler(e: any) {
    e.preventDefault();

    try {
      const response = await client({
        method: "post",
        url: "api/users/login",
        data: userLoginInfo,
      });

      if (response.data.success) {
        dispatch(login({ userData: response.data.data.user }));
        console.log(response);
        const token = response.data.data.token;
        console.log(token);
        localStorage.setItem("authToken", token);
        console.log("response: ", response.data);
        navigate("/todos");
      }
    } catch (error) {
      console.log("login error: ", error);
    }
  }

  function handleChange(e: any) {
    const { id, value } = e.target;
    setUserLoginInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  }

  return (
    <div className="p-2">
      <form className="flex flex-col gap-2" onSubmit={onSubmitHandler}>
        <label htmlFor="username">
          _username:
          <input
            className="bg-gray-300"
            type="text"
            id="username"
            value={userLoginInfo.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          _password:
          <input
            className="bg-gray-300"
            type="text"
            id="password"
            value={userLoginInfo.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">_submit</button>
      </form>
    </div>
  );
}

export default Login;
