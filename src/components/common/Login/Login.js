import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let indexUser = users.findIndex(
      (user) => user.account == username && user.password == password
    );
    if (indexUser === -1 || users[indexUser].status == 0) {
      toast.error("User or password not found");
    } else {
      sessionStorage.setItem("user", JSON.stringify(users[indexUser]));
      if (users[indexUser].roll == 0) {
        navigate("/");
      }
      if (users[indexUser].roll == 1) {
        navigate("/dashboard");
      }
    }

    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <img src="Images/logo.png" className="card-img-top"></img>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group mb-0">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="d-flex float-right pb-3 mr-2">
          <a href="\signup">Sign up </a>
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
