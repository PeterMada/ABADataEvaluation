import React from 'react';
import { Link } from 'react-router-dom';

export const LeftMenu = () => {
  return (
    <div className="flex flex-col w-48">
      <Link
        to="/login"
        className="hover:underline hover:text-blue-600 py-2 px-4 text-center">
        Přihlášení
      </Link>
      <Link
        to="/login"
        className="hover:underline hover:text-blue-600 py-2 px-4 text-center">
        Přihlášení
      </Link>
      <Link
        to="/login"
        className="hover:underline hover:text-blue-600 py-2 px-4 text-center">
        Přihlášení
      </Link>
    </div>
  );
};
