import React from "react";
import logo from "../../resources/img/logo.svg";
import "./UserDashboard.css";
import { Link } from "react-router-dom";


const UserDashboard = () => {
    return (
        <div className="Profile-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="Profile-dashboard">
            <h2>User</h2>
            <h2>20lvl</h2>
            <progress max="100" value="80" title="80%"></progress>
        <ol>
      <li><a>Options</a>
        <ul>
          <li><a href="/add-activity">Add new run</a></li>
          <li><a href="activities">Show activities</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </li>
        </ol>
            </div>
        </div>
    );
    }

export default UserDashboard;