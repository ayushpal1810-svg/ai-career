import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./css/auth.css";





const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const checklogin= async ()=>{
  if(!email || !password) {
    alert("please eenter email and password");
    return;
  }
  const res= await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,{
    
      method:"POST",
    
    headers:{ 
      "content-type":"application/json"
    },
    body:JSON.stringify({email,password})
  }
  )
  const data = await res.json();

if(!res.ok){
alert(data.message);
return
}
localStorage.setItem("token",data.token)

console.log("Navigating to dashboard");
navigate("/dashboard");
}
  return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Welcome Back</h1>

      <p className="auth-subtitle">
        Login to your AI Career Platform
      </p>


      <label>Email</label>

      <input
        className="input-field"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setemail(e.target.value)}
      />


      <label>Password</label>

      <input
        className="input-field"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
      />


      <button 
        className="login-btn"
        onClick={checklogin}
      >
        Login
      </button>


      <button
        className="register-btn"
        onClick={() => navigate("/register")}
      >
        Create Account
      </button>


    </div>

  </div>
)
}

export default Login
