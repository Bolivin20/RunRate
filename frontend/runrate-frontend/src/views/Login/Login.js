import React from 'react';
import logo from '../../resources/img/logo.svg';
import './Login.css';


function Login() {
  return (
    <div className="App">
      <div className="Login-container">
      <img src={logo} className="App-logo" alt="logo" />
        <h2>Login</h2>
        <form>
          <label>
           <h1>Email: </h1>
            <input type="text" name="email" />
          </label>
          <label>
           <h1>Password: </h1>
            <input type="text" name="password" />
          </label>
          <div className= "Submit-button">
          <input type="submit" value="Submit" />
          </div>
        </form>
        </div>
    </div>
  );
};

export default Login;