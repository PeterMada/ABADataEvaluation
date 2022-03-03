import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const url = process.env.API_URL || 'http://localhost:5000/';

  const getName = async () => {
    try {
      // TODO get token from cookie
      const response = await fetch(`${url}dashobard/`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
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
      <button onClick={logout}>Log out</button>
    </>
  );
};
