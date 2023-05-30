import React, { useEffect, useState } from 'react';
import logo from '../../resources/img/logo.svg';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
    useEffect(() => {
        document.title = 'RunRate';
      }, []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetch('http://localhost:8080/user/admin', {
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
        setIsAdmin(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('http://localhost:8080/user/admin/details', {
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
        setDetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isAdmin){
    return null;
  }
  

  return (
    <div className="Admin-container">
      <header>
        <img src={logo} alt="Logo" />
        <h1>Welcome, Admin</h1>
      </header>
      <div className="Admin-content">
        <div>
          {details.map((detail) => (
            <div key={detail.id}>
            <p>ID: {detail.id}, 
            Training Date: {detail.trainingDate}, 
            Hours: {detail.hours}, 
            Minutes: {detail.minutes},
            Distance: {detail.distance},
            Elevation: {detail.elevation},
            Training Points: {detail.trainingPoints}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
