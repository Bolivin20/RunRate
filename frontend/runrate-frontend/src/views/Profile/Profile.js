import React from 'react';
import Activity from '../../components/Activity/Activity';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import './Profile.css';
import { Link } from 'react-router-dom';


function getActivities() {
    const activities = [];
    for (let i = 0; i < 4; i++) {
        activities.push(<Activity />);
    }
    return activities;
}

function Profile() {
    return (
    <div className="App">
        <div className="Profile-container">
        <UserDashboard />
        <div className="Profile-axis">   
        <progress max="100" value="80" title="80%">80%</progress>
        <h1>Your progress in preparing for the marathon.</h1>
        </div>
        
        <div className="Profile-activities">
            <h1>Last activities:</h1>
            <div className="Profile-activity">
            {getActivities()}
            </div>
        </div>
        <div className="Profile-buttons">
            <Link to="/add-activity">
            <button className="Profile-button">Add activity</button>
            </Link>
            <Link to="/activities">
            <button className="Profile-button">Show all</button>
            </Link>
        </div>
        </div>
    </div>
    );
}

export default Profile;