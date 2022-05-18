import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LeftMenu = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Úspěšně jste se odhlásili');
  };

  return (
    <div className="flex flex-col w-48">
      <Link
        to="/dashboard"
        className="hover:underline hover:text-blue-600 py-2 px-4">
        Dashboard
      </Link>
      <Link
        to="/profile"
        className="hover:underline hover:text-blue-600 py-2 px-4">
        Profil
      </Link>
      <Link
        to="/addPerson"
        className="hover:underline hover:text-blue-600 py-2 px-4">
        Nový teraput
      </Link>
      <Link
        to="/addChild"
        className="hover:underline hover:text-blue-600 py-2 px-4">
        Nový študent
      </Link>

      <button
        className="hover:underline hover:text-blue-600 py-2 px-4 text-left"
        onClick={logout}>
        Odhlásit se
      </button>
    </div>
  );
};
