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
      setName(parseRes.user_name);
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
    <header>
      <img src={logo} alt="Logo" style={{ maxWidth: '200px' }} />
      <div>
        {isAuthenticated ? (
          <Link to="/profile" className="header-profile">
            <img
              className="header-profile__img"
              src={profileDefault}
              alt={name}
            />
            <p>{name}</p>
          </Link>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};
