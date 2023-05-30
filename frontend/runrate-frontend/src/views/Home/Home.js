import { Link } from 'react-router-dom';
import React, {useEffect} from 'react';
import logo from '../../resources/img/logo.svg';
import './Home.css';



function Home() {
  useEffect(() => {
    document.title = 'RunRate';
  }, []);

    return (
    <div className="App">
      <header className="App-header">
      
      <img src={logo} className="App-logo" alt="logo" />
      <p>Overcome difficulties, improve yourself.</p>

      <div className="App-button-container">    
      <Link to="/api/auth/authenticate">
      <button className="App-button">Sign in</button>
      </Link>
      <Link to="api/auth/register">
      <button className="App-button">Sign up</button>
      </Link>
      </div>
      <div className="Down-wave"></div>
     </header>
    </div>
    );
  }

export default Home;