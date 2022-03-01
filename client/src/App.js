import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const App = () => {
  return (
    <>
      <Dashboard />
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <Dashboard {...props} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};
