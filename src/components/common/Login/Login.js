import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

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
            (user) => user.username == username && user.password == password
        );
        if (indexUser === -1 || users[indexUser].status == 0) {
            toast.error("User or password not found");
        } else {
            sessionStorage.setItem("user", JSON.stringify(users[indexUser]));
            // toast.success("Login successful");
            console.log(sessionStorage.getItem("user"));
            toast.success("Login successful", {
                autoClose: 500, // Thời gian tự đóng toast (ms)
                onClose: () => navigate("/")
              });
            
        }

        // Reset the form
        setUsername("");
        setPassword("");
    };


    return (
        <div className="login-container">
            <ToastContainer />
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
                <div className="d-flex justify-content-start pb-3 mr-2" style={{ marginTop: "10px" }}>
                    <a href="/signup" className="btn btn-primary">Sign up</a>
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
