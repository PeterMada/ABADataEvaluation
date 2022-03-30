import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Program = () => {
  const [currentProgram, setCurrentProgram] = useState([]);
  const { id } = useParams();

  return (
    <>
      <h1>Program detail page</h1>
      <p>Some information about current program</p>
      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addTarget/${id}`}>
          Add new target to this program
        </Link>
      </div>
    </>
  );
};
