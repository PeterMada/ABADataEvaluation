import React from 'react';
import { Link } from 'react-router-dom';

export const TargetBox = ({ target }) => {
  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow-md">
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
