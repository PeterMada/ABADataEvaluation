import React from 'react';
import { Link } from 'react-router-dom';

export const TargetBox = ({ target, percentageDone }) => {
  const randomPercentage = Math.floor(Math.random() * 100);
  if (percentageDone < 10) {
  }

  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow-md">
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{
              width: `${percentageDone < 10 ? 10 : percentageDone}%`,
            }}>
            {`${percentageDone}%`}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <h2>
            <Link to={`/target/${target.target_id}`}>
              {target.target_title}
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};
