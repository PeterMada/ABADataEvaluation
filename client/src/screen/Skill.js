import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Skill = () => {
  const [currentSkill, setCurrentSkill] = useState([]);
  const { id } = useParams();

  return (
    <>
      <h1>Skill detail page</h1>
      <p>Some information about current skill</p>
      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addProgram/${id}`}>
          Add new program to this skill
        </Link>
      </div>
    </>
  );
};
