import React from 'react';
import './Activity.css';

function Activity({ trainingDate, hours, minutes, distance, elevation, trainingPoints }) {
  return (
    <div className="Activity">
      <div className="Activity-details">
        <p>{trainingDate}</p>
        <div className="Activity-data">
          <p>Time: {hours}h {minutes}min</p>
          <p>Distance: {distance}km</p>
          <p>Elevation: {elevation}m</p>
        </div>
      </div>
      <div className="Activity-points">
        <p>{trainingPoints} points</p>
      </div>
    </div>
  );
}

export default Activity;
