import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

toast.configure();

export const App = () => {
  const [isAuthenticated, setsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setsAuthenticated(boolean);
  };

  const isAuth = async () => {
    const url = process.env.URL || 'http://localhost:5000/';
    try {
      const response = await fetch(`${url}auth/verify`, {
        metod: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true
        ? setsAuthenticated(true)
        : setsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  });

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate replace to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
