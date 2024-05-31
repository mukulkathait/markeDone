import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import Header from "./components/Header.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Homepage from "./components/Homepage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/todos",
    element: <Homepage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
