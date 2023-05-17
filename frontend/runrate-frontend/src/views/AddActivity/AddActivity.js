import React, { useState } from "react";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import "./AddActivity.css";
import { useNavigate } from "react-router-dom";


function AddActivity() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/user/profile/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          hours,
          minutes,
          distance,
          elevation,
        }),
      });
      if (res.ok) {
        // handle success
        console.log("Activity added successfully");
        navigate("/user/profile");
      } else {
        // handle error
        console.error("Failed to add activity");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="AddActivity-container">
        <UserDashboard />
        <div className="AddActivity-form">
          <h1>Add new activity:</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <h1>Time:</h1>
              <div className="AddActivity-time">
                <input
                  type="number"
                  name="hours"
                  min="0"
                  max="200"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <h1>h</h1>
                <input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
                <h1>min</h1>
              </div>
            </label>
            <label>
              <h1>Distance:</h1>
              <div className="AddActivity-distance">
                <input
                  type="text"
                  name="distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
                <h1>km</h1>
              </div>
            </label>
            <label>
              <h1>Elevation:</h1>
              <div className="AddActivity-elevation">
                <input
                  type="text"
                  name="elevation"
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                />
                <h1>m</h1>
              </div>
            </label>
            <div className="Submit-button">
              <input type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddActivity;
