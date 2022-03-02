import React, { useState, useEffect } from 'react';

export const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      // TODO get token from cookie
      const response = await fetch('http://localhost:5000/dashobard/', {
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