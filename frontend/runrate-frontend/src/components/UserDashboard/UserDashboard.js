import React, { useState, useEffect } from "react";
import logo from "../../resources/img/logo.svg";
import "./UserDashboard.css";

const handleLogout = () => {
  localStorage.removeItem("token");
};

const UserDashboard = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    fetch("http://localhost:8080/user/profile/points", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPoints(data.points);
        setLevel((Math.floor(points / 10)) + 1);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:8080/user/profile/name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [points]);

  const calculateProgress = () => {
    return points % 10;
  };

  return (
    <div className="Profile-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="Profile-dashboard">
        <h2>{name}</h2>
        <h2>{level}lvl</h2>
        <progress
          max="10"
          value={calculateProgress()}
          title={`${calculateProgress()}%`}
        ></progress>
        <ol>
          <li>
            <a>Options</a>
            <ul>
              <li>
                <a href="/add-activity">Add new run</a>
              </li>
              <li>
                <a href="/activities">Show activities</a>
              </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default UserDashboard;
