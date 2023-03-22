import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/img/logo.svg';
import './Home.css';



function Home() {
    return (
    <div className="App">
      <header className="App-header">
      
      <img src={logo} className="App-logo" alt="logo" />
      <p>Overcome difficulties, improve yourself.</p>

      <div className="App-button-container">    
      <Link to="/login">
      <button className="App-button">Sign in</button>
      </Link>
      <Link to="/registration">
      <button className="App-button">Sign up</button>
      </Link>
      </div>
      <div className="Down-wave"></div>
     </header>
    </div>
    );
  }

export default Home;