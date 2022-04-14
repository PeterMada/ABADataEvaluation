import React from 'react';
import { Link } from 'react-router-dom';

export const ProgramBox = ({ program, targets }) => {
  const criterionFrom = targets.filter((target) => target.target_complete);
  const baselineCompleted = targets.filter(
    (target) => target.target_baseline_done
  );

  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{program.program_title}</h3>
        <p>{`Baseline: ${program.program_baseline_from} out of ${program.program_baseline_to}`}</p>
        <div className="mt-4">
          Baseline
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${
                  baselineCompleted.length / program.program_baseline_to <
                  10
                    ? 10
                    : baselineCompleted.length /
                      program.program_baseline_to
                }%`,
              }}>
              {`${baselineCompleted.length}/${program.program_baseline_to}`}
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          Targets
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${
                  criterionFrom.length / targets.length < 10
                    ? 10
                    : criterionFrom.length / targets.length
                }%`,
              }}>
              {`${criterionFrom.length}/${targets.length}`}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {targets.map((target) => {
            return (
              <div
                key={target.target_id}
                className="bg-white p-2 rounded-lg shadow-md">
                <h4>
                  <Link to={`/target/${target.target_id}`}>
                    {target.target_title}
                  </Link>
                </h4>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <Link
            className="bg-blue-500  ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/program/${program.program_id}`}>
            Program detail
          </Link>

          <Link
            className="bg-blue-500  ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/addTarget/${program.program_id}`}>
            Add target
          </Link>
        </div>
      </div>
    </>
  );
};
