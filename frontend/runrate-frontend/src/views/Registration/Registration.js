import React, {useEffect, useState} from 'react';
import logo from '../../resources/img/logo.svg';
import { useNavigate } from "react-router-dom";
import './Registration.css';

function Registration() {
  useEffect(() => {
    document.title = 'RunRate';
  }, []);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [name, setName]=useState("");
    const navigate = useNavigate();
    const [validPassword, setValidPassword]=useState(false);
    const [validEmail, setValidEmail]=useState(false);
    const [validName, setValidName]=useState(false);
    const [errorMsg, setErrorMsg]=useState("");


    useEffect(()=>
    {   if(name.trim().length !== 0)
          { 
            setValidName(true);
          }
          else
          {
            setValidName(false);
          }
         
    }, [name]);

    useEffect(()=>
    {   if(email.trim().length !== 0)
          { 
            setValidEmail(email.includes("@") && email.includes("."));
          }
          else
          {
            setValidEmail(false);
          }
         
    }, [email]);

    useEffect(()=>
    {
      if(password.trim().length !== 0 && confirmPassword.trim().length !== 0)
        {
          if( password===confirmPassword) {
            setValidPassword(true);
          }
          else
            setValidPassword(false);
  
        }
    },[password, confirmPassword]);

    useEffect(() => {
        console.log(validPassword);
        console.log(validEmail);
        if(!validName)
        setErrorMsg("Name can't be blank.");
        else if(!validEmail)
        setErrorMsg("Wrong email format.");
        else if(!validPassword)
        setErrorMsg("Passwords don't match.");
        else
        setErrorMsg("");
      }, [validPassword, validEmail, validName]);

    const sendRegisterRequest=(event) => 
  {
      event.preventDefault();
      const data = { 
        name: name,
        email:email,
        password:password,
      };
    
      fetch("http://localhost:8080/api/auth/register", {
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
        }).then((data) => {
            localStorage.setItem("token", data.access_token);
            navigate("/user/profile"); 
        }).catch((error) => {
            console.log("Error: " + error);
        });
        //navigate("/api/auth/authenticate");
    };
    return (
    <div className="App">
        <header className="Registration-container">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Registration</h1>
        <form onSubmit={sendRegisterRequest}>
            <label>
            <h3>Username:</h3>
            <input type="text" name="name" value = {name} onChange={(event)=>setName(event.target.value)}/>
            </label>
            <label>
            <h3>Email:</h3>
            <input type="text" name="email" value = {email} onChange={(event)=>setEmail(event.target.value)} />
            </label>
            <label>
            <h3>Password:</h3>
            <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
            </label>
            <label>
            <h3>Confirm password:</h3>
            <input type="password" name="confirmPassword"value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </label>
            <div className="Error-message">
            <p>{errorMsg} </p>
            </div>
            <div className= "Submit-button">
            <button disabled={!validEmail || !validPassword || !validName ? true : false} id="submit" type="submit" onChange={(event)=>setErrorMsg(event.target.value)}>submit</button>
            </div>
        </form>
        </header>   
    </div>
    );
}

export default Registration;
