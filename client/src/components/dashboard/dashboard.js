import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      // TODO get token from cookie
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}dashobard/`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      setName(`${parseRes.user_first_name} ${parseRes.user_last_name}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out sucessfully');
  };

  useEffect(() => {
    getName();
  });

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Dashboard for {name}
      </h1>
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
