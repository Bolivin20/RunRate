import React, { useState, useEffect } from "react";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import "./Activities.css";
import Activity from "../../components/Activity/Activity";
import { useNavigate } from "react-router-dom";

function UserActivities() {
  const [trainings, setTrainings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetch("http://localhost:8080/user/profile", {
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
        setTrainings(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  function getAllActivities() {
    return trainings && trainings.map((training) => <Activity key={training.id} {...training} />);

  }

  return (
    <div className="App">
      <div className="App-container">
        <UserDashboard />
      </div>
      <h1>Activities:</h1>
      <div className="UserActivities-container">{getAllActivities()}</div>
      <div className="Error-message">{error && <p>{error.message}</p>}</div>
    </div>
  );
}

export default UserActivities;
