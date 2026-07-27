import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const registerUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
  alert("Please enter a valid email");
  return; 
}
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

 return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Create Account</h1>

      <p className="auth-subtitle">
        Join AI Career Platform
      </p>


      <label>Name</label>

      <input
        className="input-field"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setname(e.target.value)}
      />


      <label>Email</label>

      <input
        className="input-field"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setemail(e.target.value)}
      />


      <label>Password</label>

      <input
        className="input-field"
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
      />


      <button
        className="register-btn"
        onClick={registerUser}
      >
        Register
      </button>


      <button
        className="login-btn"
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </button>


    </div>

  </div>
);
};

export default Register;