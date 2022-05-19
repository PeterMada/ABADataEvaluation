import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

export const Target = ({ setAuth }) => {
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
    <div className=" m-auto">
      <div className="flex  flex-col-reverse md:flex-row">
        <div className="md:border-r-2 md:border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full md:pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600 flex justify-between">
            <span className="block">{curretnTarget.target_title}</span>
            <span className="ml-4 block">
              {curretnTarget.target_complete ? <p>✔️</p> : ''}
            </span>
          </h1>
          <p>{curretnTarget.target_description}</p>

          {curretnTarget.target_complete &&
          curretnTarget.target_done_from_baseline ? (
            <p>Hotovo z baseline</p>
          ) : (
            ''
          )}
          {curretnTarget.target_complete &&
          !curretnTarget.target_done_from_baseline ? (
            <p>Hotovo z učení</p>
          ) : (
            ''
          )}

          <div className="mt-6 mb-10">
            <h2 className="mb-3 font-medium">Všechny záznamy </h2>

            {currentMeasurments.length ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-[#3b82f685] ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Datum
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Čas
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Naměřil
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Výsledek
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Typ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Stav
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMeasurments.map((meas, i) => {
                      const date = new Date(meas.measurement_created);
                      const year = date.getFullYear();
                      const month = date.getMonth() + 1;
                      const dt = date.getDate();

                      let status = `Otevřeno`;
                      if (meas.measurement_closed) {
                        status = `Uzavřeno`;
                      }
                      if (meas.measuremend_type === 'baseline') {
                        status = '-';
                      }

                      let rowColor;
                      switch (status) {
                        case 'Uzavřeno':
                          rowColor = 'bg-green-600 text-white';
                          break;
                        case '-':
                          rowColor = 'bg-[#2563eb33] text-black';
                          break;
                        default:
                          rowColor = 'bg-orange-300 text-black';
                          break;
                      }

                      return (
                        <tr
                          key={meas.measurement_id}
                          className={`${rowColor} border-b border-white`}>
                          <td className="px-6 py-4">
                            {`${dt}. ${month}. ${year}`}
                          </td>
                          <td className="px-6 py-4">
                            {`${String(date.getHours()).padStart(
                              2,
                              '0'
                            )}:${String(date.getMinutes()).padStart(
                              2,
                              '0'
                            )}`}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/person/${meas.user_id}`}
                              className="hover:underline hover:text-blue-600">{`${meas.user_first_name} ${meas.user_last_name}`}</Link>
                          </td>
                          <td className="px-6 py-4">
                            {meas.question_result ? 'Ano' : 'Ne'}
                          </td>
                          <td className="px-6 py-4">
                            {meas.measuremend_type == 'baseline'
                              ? 'baseline'
                              : 'normální'}
                          </td>
                          <td className="px-6 py-4">{status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Žádné záznamy</p>
            )}
          </div>
          {curretnTarget.target_complete ? (
            ''
          ) : (
            <div className="mt-16 text-right">
              <Link
                className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/recording/${id}`}>
                Začít nové měření
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
