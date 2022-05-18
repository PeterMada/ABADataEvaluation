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
import { Dashboard } from './screen/Dashboard';
import { Login } from './components/login/Login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { PersonForm } from './forms/personForm/PersonForm';
import { AddChild } from './forms/addChild/AddChild';
import { Child } from './screen/Child';
import { AddSkill } from './forms/addSkill/AddSkill';
import { Skill } from './screen/Skill';
import { AddProgram } from './forms/addProgram/AddProgram';
import { Program } from './screen/Program';
import { AddTarget } from './forms/addTarget/AddTarget';
import { Target } from './screen/Target';
import { EditSkill } from './forms/editSkill/editSkill';
import { Recording } from './screen/Recording';
import { RecordAll } from './screen/RecordAll';
import { ReviewAll } from './screen/ReviewAll';
import { RecordAllBaseline } from './screen/RecordAllBaseline';
import { EditProgram } from './forms/editProgram/EditProgram';
import { Session } from './screen/Session';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setsAuthenticated(boolean);
  };

  const isAuth = async () => {
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
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
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

  return isLoading ? (
    ''
  ) : (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} />
      <div className="container max-w-screen-xl min-w-[320px] mx-auto py-8 px-4">
        <Routes>
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
                <Child setAuth={setAuth} />
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
                <AddSkill setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/editSkill/:id"
            element={
              isAuthenticated ? (
                <EditSkill setAuth={setAuth} />
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
                <Skill setAuth={setAuth} />
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
            path="/editProgram/:id"
            element={
              isAuthenticated ? (
                <EditProgram />
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
                <Program setAuth={setAuth} />
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
                <Target setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/recording/:id"
            element={
              isAuthenticated ? (
                <Recording />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/recordAll/:id"
            element={
              isAuthenticated ? (
                <RecordAll />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/reviewAll/:id"
            element={
              isAuthenticated ? (
                <ReviewAll />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/recordAllBaseline/:id"
            element={
              isAuthenticated ? (
                <RecordAllBaseline />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            path="/session/:id"
            element={
              isAuthenticated ? (
                <Session setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route
            exact
            path="/"
            index
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

/*
<Route
  exact
  path="/"
  index
  element={
    !isAuthenticated ? (
      <Login setAuth={setAuth} />
    ) : (
      <Navigate replace to="/dashboard" />
    )
  }
/>;
*/
