import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const App = () => {
  const [isAuthenticated, setsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setsAuthenticated(boolean);
  };

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
