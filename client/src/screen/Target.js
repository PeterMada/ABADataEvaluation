import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Target = () => {
  const [curretnTarget, setCurretnTarget] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTargetDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}targetDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, target_id: id },
          }
        );
        const parseRes = await response.json();

        setCurretnTarget(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchTargetDetails().catch(console.error);
  }, []);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        {curretnTarget.target_title}
      </h1>
      <p>Target type: {curretnTarget.target_type}</p>
      <p>{curretnTarget.target_description}</p>

      <div className="mt-6 mb-10">
        <h2>All regordings of this target</h2>
      </div>
      <div className="mt-6 mb-10">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/recording/${id}`}>
          Start recording for this target
        </Link>
      </div>
    </>
  );
};
