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
import Admin from './views/Admin/Admin';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'api/auth/authenticate',
    element: <Login />,
  },
  {
    path: 'api/auth/register',
    element: <Registration />,
  },
  {
    path: 'user/profile',
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
  {
    path: '/admin',
    element: <Admin />,
  },

]);

const reactRoot = () => { ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);
};

reactRoot();


