import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Target = () => {
  const [curretnTarget, setCurretnTarget] = useState([]);
  const [currentMeasurments, setCurrentMeasurments] = useState([]);
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

    const fetchMeasurementsForTarger = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}targetMeasurements`,
          {
            method: 'GET',
            headers: { token: localStorage.token, target_id: id },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setCurrentMeasurments(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchTargetDetails().catch(console.error);
    const measurmentsResult = fetchMeasurementsForTarger().catch(
      console.error
    );
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Measrurment by
                </th>
                <th scope="col" className="px-6 py-3">
                  Result
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMeasurments.map((meas, i) => {
                const date = new Date(meas.measurement_created);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const dt = date.getDate();
                console.log(meas.measurement_closed);
                let rowColor = 'bg-orange-300 text-black';
                if (meas.measurement_closed) {
                  rowColor = 'bg-green-600 text-white';
                }

                return (
                  <tr
                    key={meas.measuremend_by}
                    className={`${rowColor} border-b dark:bg-gray-800 dark:border-gray-700`}>
                    <td className="px-6 py-4">
                      {`${dt}. ${month}. ${year}`}
                    </td>
                    <td className="px-6 py-4">
                      {`${String(date.getHours()).padStart(
                        2,
                        '0'
                      )}:${String(date.getMinutes()).padStart(2, '0')}`}
                    </td>
                    <td className="px-6 py-4">{`${meas.user_first_name} ${meas.user_last_name}`}</td>
                    <td className="px-6 py-4">
                      {meas.question_result ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4">
                      {meas.measurement_closed ? 'Closed' : 'Open'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
