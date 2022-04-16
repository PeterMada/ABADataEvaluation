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
        setCurrentTargets(parseRes.results);
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
      <p>{currentProgram.program_description}</p>
      <p>{`Baseline: ${currentProgram.program_baseline_from}/${currentProgram.program_baseline_to}`}</p>
      <p>{`Measured baseline: ${currentProgram.program_baseline_result}`}</p>
      <p>{`Measured done: ${
        currentProgram.program_baseline_done ? 'Yes' : 'No'
      }`}</p>

      <div className="mt-10">
        <h2>All targets for this program</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {currentTargets.map((target) => {
            let programDonePercentage = 0;
            let baselineStart = 0;
            let baselineFinish = 3;

            target.measurements.map((meas) => {
              if (meas.question_result === true) {
                baselineStart++;
              } else {
                return;
              }
            });

            programDonePercentage = Math.floor(
              (baselineStart / baselineFinish) * 100
            );

            return (
              <TargetBox
                key={target.target.target_id}
                target={target.target}
                percentageDone={programDonePercentage}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addTarget/${id}`}>
          Add new target to this program
        </Link>
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/editProgram/${id}`}>
          Edit program
        </Link>
      </div>
    </>
  );
};
