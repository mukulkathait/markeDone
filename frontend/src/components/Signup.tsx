import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  async function onSubmitHandler(e: any) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        userInfo
      );
      if (response.data.success) {
        dispatch(login({ userData: response.data.data.user }));
        console.log(response);
        const token = response.data.data.token;
        console.log(token);
        localStorage.setItem("authToken", token);
        console.log("response: ", response.data);
        navigate("/todos");
        console.log("Result: ", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: any) {
    const { id, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  return (
    <div className="p-10">
      <div>welcome to _markeDone</div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
        <label htmlFor="firstName">
          First Name:
          <input
            className="bg-gray-300"
            id="firstName"
            type="text"
            value={userInfo.firstName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input
            className="bg-gray-300"
            id="lastName"
            type="text"
            value={userInfo.lastName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="username">
          Username:{" "}
          <input
            className="bg-gray-300"
            id="username"
            type="text"
            required
            value={userInfo.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email:{" "}
          <input
            className="bg-gray-300"
            id="email"
            type="text"
            required
            value={userInfo.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            className="bg-gray-300"
            id="password"
            type="text"
            required
            value={userInfo.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
