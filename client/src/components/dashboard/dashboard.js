import React from 'react';

export const Dashboard = ({ setAuth }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Logout</button>
    </>
  );
};
