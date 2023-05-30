import React, {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../resources/img/logo.svg';
import './Login.css';


function Login() {
  useEffect(() => {
    document.title = 'RunRate';
  }, []);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [errorMsg, setErrorMsg]=useState("");
    const navigate = useNavigate();
    const sendLoginRequest=(event) => 
  {
      event.preventDefault();
      const data = { 
        email:email,
        password:password,
      };
    
      fetch("http://localhost:8080/api/auth/authenticate", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
       
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        navigate("/user/profile"); 
      })
      .catch((error) => {
        console.log("Error: " + error);
        setErrorMsg("Wrong email or password.");
      });

      
    };
  return (
    <div className="App">
      <div className="Login-container">
      <img src={logo} className="App-logo" alt="logo" />
        <h2>Login</h2>
        <form onSubmit={sendLoginRequest}>
          <label>
           <h1>Email: </h1>
            <input type="text" name="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
          </label>
          <label>
           <h1>Password: </h1>
            <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
          </label>
          <div className="Error-message" onChange={(event)=>setErrorMsg(event.target.value)}>
          <h3>{errorMsg}</h3>
          </div>
          <div className= "Submit-button">
          <input type="submit" value="Submit" />
          </div>
        </form>
        </div>
    </div>
  );
};

export default Login;
