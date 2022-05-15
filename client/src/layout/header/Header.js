import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/ABA-logo-placeholder.png';
import profileDefault from '../../assets/images/Profile-default.jpg';
import './header.css';

export const Header = ({ isAuthenticated }) => {
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

  useEffect(() => {
    if (isAuthenticated) {
      getName();
    }
  });

  return (
    <header className="max-w-screen-xl m-auto py-2 px-4">
      <div className="flex items-center	justify-between">
        <p></p>
        <div>
          <Link to="/profile" className="header-profile flex items-center">
            <img
              className="header-profile__img"
              src={profileDefault}
              alt={name}
            />
            <p className="pl-4">{name}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};
