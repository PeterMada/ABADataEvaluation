import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Frequency } from '../components/measurement/Frequency';
import { FrequencyTime } from '../components/measurement/FrequencyTime';
import { PolarQuestion } from '../components/measurement/PolarQuestion';

export const RecordAll = ({ id }) => {
  const [targets, setTargets] = useState([]);
  const [baselineTargets, setBaselineTargets] = useState([]);
  const [remove, setRemove] = useState();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}allChildrenTargets`,
          {
            method: 'GET',
            headers: { token: localStorage.token, child_id: id },
          }
        );
        const parseRes = await response.json();
        setTargets(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const targetResult = fetchProgramDetails().catch(console.error);
  }, []);

  useEffect(() => {
    setTargets(targets.filter((item) => item.target_id !== remove));
  }, [remove]);

  return !targets.length ? (
    ''
  ) : (
    <div>
      <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
        Měření
      </h2>
      <div>
        {targets.map((target, current) => {
          let currentMeasurmentComponent;

          switch (target.target_type) {
            case 'frequency/time':
              currentMeasurmentComponent = <FrequencyTime />;
              break;
            case 'yes/no':
              currentMeasurmentComponent = (
                <PolarQuestion
                  data={target}
                  setRemove={setRemove}
                  current={current}
                />
              );
              break;
            case 'frequency':
              currentMeasurmentComponent = (
                <Frequency
                  data={target}
                  setRemove={setRemove}
                  current={current}
                />
              );
              break;
            default:
              currentMeasurmentComponent = (
                <p>Measurement type does not exist.</p>
              );
          }

          return (
            <div
              className="block bg-[#2563eb0f] px-4 py-4 mb-4 rounded-lg shadow-md  overflow-hidden"
              key={target.target_id}>
              {currentMeasurmentComponent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
