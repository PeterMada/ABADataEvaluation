import React from 'react';
import { Link } from 'react-router-dom';

export const ProgramBox = ({ program, targets }) => {
  const criterionFrom = targets.filter((target) => target.target_complete);

  const percentageCriterion =
    (criterionFrom / program.program_baseline_from) * 100;

  let percentageSliderCriterion = percentageCriterion;
  if (percentageCriterion < 10) {
    percentageSliderCriterion = 10;
  } else if (percentageCriterion > 100) {
    percentageSliderCriterion = 100;
  }

  return (
    <>
      <div className="bg-white px-4 py-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{program.program_title}</h3>
        <p>{`Baseline: ${program.program_baseline_from} z ${program.program_baseline_to}`}</p>
        {program.program_baseline_done ? <p>✔️</p> : ''}

        <div className="mt-4 mb-6">
          Hotovo
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${percentageSliderCriterion}%`,
              }}>
              {`${criterionFrom.length}/${program.program_baseline_from}`}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {targets.map((target, i) => {
            if (i > 5) {
              return '';
            }
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
        <div className="flex flex-col items-end justify-end mt-6">
          <Link
            className="hover:underline hover:text-blue-600"
            to={`/program/${program.program_id}`}>
            Detail programu
          </Link>

          <Link
            className="hover:underline hover:text-blue-600"
            to={`/addTarget/${program.program_id}`}>
            Přidat cíl
          </Link>
        </div>
      </div>
    </>
  );
};
