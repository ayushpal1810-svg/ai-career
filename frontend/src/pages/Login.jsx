import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";





const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const checklogin= async ()=>{
  if(!email || !password) {
    alert("please email ans password");
    return;
  }
  const res= await fetch(
    "http://localhost:3000/api/auth/login",{
    
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
navigate("/dashboard");
}
  return (
    <div>
        <h2>enter email</h2>
      <input type="text"  placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)}/>
      <h2>enter password</h2>
      <input type="password" placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <button onClick={checklogin}>login</button>
    </div>
  )
}

export default Login
