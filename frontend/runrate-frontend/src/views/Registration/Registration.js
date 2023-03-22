import React from 'react';
import logo from '../../resources/img/logo.svg';
import './Registration.css';

function Registration() {
    return (
    <div className="App">
        <header className="Registration-container">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Registration</h1>
        <form>
            <label>
            <h3>Email:</h3>
            <input type="text" name="email" />
            </label>
            <label>
            <h3>Password:</h3>
            <input type="text" name="password" />
            </label>
            <label>
            <h3>Confirm password:</h3>
            <input type="text" name="confirmPassword" />
            </label>
            <div className= "Submit-button">
            <input type="submit" value="Submit" />
            </div>
        </form>
        </header>   
    </div>
    );
}

export default Registration;
