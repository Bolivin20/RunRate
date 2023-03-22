import React from "react";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import "./AddActivity.css";


function AddActivity() {
  return (
    <div className="App">
      <div className="AddActivity-container">
        <UserDashboard />
        <div className="AddActivity-form">
        <h1>Add new activity:</h1>
        <form>
          <label>
            <h1>Time:</h1>
            <div className="AddActivity-time">
            <input type="number" name="hours" min="0" max="200"/>
            <h1>h</h1>
            <input type="number" name="minutes" min="0" max="59" />
            <h1>min</h1>
            </div>
          </label>
          <label>
            <h1>Distance:</h1>
            <div className="AddActivity-distance">
            <input type="text" name="distance" />
            <h1>km</h1>
            </div>
          </label>
          <label>
            <h1>Elevation:</h1>
            <div className="AddActivity-elevation">
            <input type="text" name="elevation" />
            <h1>m</h1>
            </div>
          </label>
          <div className="Submit-button">
            <input type="submit" value="Submit" />
            </div>
            </form>
            </div>
            </div>
    </div>
  );
}

export default AddActivity;