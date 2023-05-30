import React, { useState, useEffect } from 'react';
import Activity from '../../components/Activity/Activity';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Profile() {
  useEffect(() => {
    document.title = 'RunRate';
  }, []);
  const [trainings, setTrainings] = useState([]);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetch('http://localhost:8080/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((error) => {
        setError(error);
      });

    fetch('http://localhost:8080/user/profile/points', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPoints(data.points);
        console.log(data.points);
      })
      .catch((error) => {
        setError(error);
      });

    fetch('http://localhost:8080/user/admin', { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);  
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setIsAdmin(data.admin); 
        console.log(data.admin);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calculateProgress = () => {
    return (points / 1000) * 100; 
  };

  const lastFourTrainings = trainings.slice(-4); 
console.log(isAdmin);
  return (
    <div className="App">
      <div className="Profile-container">
        <UserDashboard />
        <div className="Profile-axis">
          <progress max="100" value={calculateProgress()} title={`${calculateProgress()}%`}>
            {calculateProgress()}%
          </progress>
          <h1>Your progress in preparing for the marathon.</h1>
        </div>
        {points > 1000 && <b>You are ready!</b>}
        <div className="Profile-activities">
          <h1>Last activities:</h1>
          <div className="Profile-activity">
            {lastFourTrainings &&
              lastFourTrainings.length > 0 &&
              lastFourTrainings.map((
                training) => (
                  <Activity
                    key={training.id}
                    id={training.id}
                    trainingDate={training.trainingDate}
                    hours={training.hours}
                    minutes={training.minutes}
                    distance={training.distance}
                    elevation={training.elevation}
                    trainingPoints={training.trainingPoints}
                  />
                ))}
                </div>
                <div className="Error-message">{error && <p>{error.message}</p>}</div>
                </div>
                <div className="Profile-buttons">
                <Link to="/add-activity">
                <button className="Profile-button">Add activity</button>
                </Link>
                <Link to="/activities">
                <button className="Profile-button">Show all</button>
                </Link>
                {isAdmin && ( 
                  <Link to="/admin">
                    <button className="Profile-button">Admin Panel</button>
                  </Link>
                )}
                </div>
                </div>
                </div>
                );
                }

                
                export default Profile;
                