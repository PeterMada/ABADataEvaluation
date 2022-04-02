import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { TargetBox } from '../components/targetBox/TargetBox';

export const Program = () => {
  const [currentProgram, setCurrentProgram] = useState([]);
  const [currentTargets, setCurrentTargets] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}programDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, program_id: id },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setCurrentProgram(parseRes.programDetail);
        setCurrentTargets(parseRes.allTargets);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchProgramDetails().catch(console.error);
  }, []);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        {currentProgram.program_title}
      </h1>
      <p>Some information about current program</p>

      <div>
        <h2>All targets for this program</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {currentTargets.map((target) => {
            console.log(target);
            return <TargetBox key={target.target_id} target={target} />;
          })}
        </div>
      </div>

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
