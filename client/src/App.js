import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './layout/header/Header';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { PersonForm } from './components/personForm/personForm';
import { AddChild } from './components/addChild/AddChild';
import { Child } from './screen/Child';
import { AddSkill } from './forms/addSkill/AddSkill';
import { Skill } from './screen/Skill';
import { AddProgram } from './forms/addProgram/AddProgram';
import { Program } from './screen/Program';
import { AddTarget } from './forms/addTarget/AddTarget';
import { Target } from './screen/Target';

toast.configure();
/*
const RequireAuth = ({
  children,
  isAuthenticated,
}: {
  children: JSX.Element,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(isAuthenticated);
  console.log(children);
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const Routing = ({ setAuth, isAuthenticated }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Dashboard setAuth={setAuth} />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
*/

export const App = () => {
  const [isAuthenticated, setsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setsAuthenticated(boolean);
  };

  const isAuth = async () => {
    console.log('auth hook');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/verify`,
        {
          metod: 'GET',
          headers: { token: localStorage.token },
        }
      );

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

  //return <Routing setAuth={setAuth} isAuthenticated={isAuthenticated} />;

  /*
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
            */

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
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
          <Route
            exact
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/addPerson"
            element={isAuthenticated ? <PersonForm /> : <PersonForm />}
          />
          <Route
            exact
            path="/addChild"
            element={
              isAuthenticated ? (
                <AddChild />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/child/:id"
            element={
              isAuthenticated ? (
                <Child />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/addSkill/:id"
            element={
              isAuthenticated ? (
                <AddSkill />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/skill/:id"
            element={
              isAuthenticated ? (
                <Skill />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/addProgram/:id"
            element={
              isAuthenticated ? (
                <AddProgram />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/program/:id"
            element={
              isAuthenticated ? (
                <Program />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/addTarget/:id"
            element={
              isAuthenticated ? (
                <AddTarget />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/target/:id"
            element={
              isAuthenticated ? (
                <Target />
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
