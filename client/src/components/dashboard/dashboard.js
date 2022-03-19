import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allPersons, setAllPersons] = useState([]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out sucessfully');
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchPersonsList = async () => {
      // TODO get token from cookie
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}personsList`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      if (!isCancelled) {
        setAllPersons(parseRes);
      }
    };

    const fetchName = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}dashobard/`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      if (!isCancelled) {
        setName(`${parseRes.user_first_name} ${parseRes.user_last_name}`);
      }
    };

    const personsListResults = fetchPersonsList().catch(console.error);
    const nameResults = fetchName().catch(console.error);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Dashboard for {name}
      </h1>

      <div data-testid="personsListWrapper">
        <h2>Lists of people</h2>
        <div>
          {allPersons.length > 0 ? (
            <h3>Adam Peter</h3>
          ) : (
            <p>There are no people in list</p>
          )}
        </div>
      </div>

      <button
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}>
        Log out
      </button>
      <Link
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/profile">
        Profile
      </Link>
      <Link
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/addPerson">
        Add new Person
      </Link>
    </>
  );
};
