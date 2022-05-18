import React from 'react';
import { Link } from 'react-router-dom';

export const TargetBox = ({ target, percentageDone }) => {
  return (
    <>
      <Link
        to={`/target/${target.target_id}`}
        className="bg-[#2563eb0f] px-4 py-4 rounded-lg shadow-md flex flex-col hover:shadow-xl transition-shadow overflow-hidden">
        <h2 className="mb-4 flex justify-between text-lg font-bold">
          <span>{target.target_title}</span>

          {target.target_complete ? <span>✔️</span> : ''}
        </h2>

        {target.target_complete ? (
          ''
        ) : (
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-6">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${percentageDone < 10 ? 10 : percentageDone}%`,
              }}>
              {`${percentageDone}%`}
            </div>
          </div>
        )}

        {target.target_complete && target.target_done_from_baseline ? (
          <p>
            <strong>Stav:</strong> Hotovo z baseline
          </p>
        ) : (
          ''
        )}
        {target.target_complete && !target.target_done_from_baseline ? (
          <p>
            <strong>Stav:</strong> Hotovo z učení
          </p>
        ) : (
          ''
        )}

        {!target.target_complete ? (
          target.target_baseline_complete ? (
            <p>
              <strong>Stav:</strong> Učení
            </p>
          ) : (
            <p>
              <strong>Stav:</strong> Měření baseline
            </p>
          )
        ) : (
          ''
        )}
      </Link>
    </>
  );
};
