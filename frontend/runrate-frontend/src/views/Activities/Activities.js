import React from "react";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import "./Activities.css";
import Activity from "../../components/Activity/Activity";


function getAllActivities() {
    const activities = [];
    for (let i = 0; i < 10; i++) {
        activities.push(<Activity />);
    }
    return activities;
}

function UserActivities() {
    return (
        <div className="App">
        <div className="App-container">
        <UserDashboard />
        </div>
        <h1>Activities:</h1>
        <div className="UserActivities-container">
        {getAllActivities()}
        </div>
        </div>
    );
}


export default UserActivities;