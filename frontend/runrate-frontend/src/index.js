import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Registration from './views/Registration/Registration';
import Profile from './views/Profile/Profile';
import Activities from './views/Activities/Activities';
import AddActivity from './views/AddActivity/AddActivity';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/activities',
    element: <Activities />,
  },
  {
    path: '/add-activity',
    element: <AddActivity />,
  },

]);

const reactRoot = () => { ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);
};

reactRoot();


