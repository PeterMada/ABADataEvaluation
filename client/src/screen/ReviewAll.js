import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Frequency } from '../components/measurement/Frequency';
import { FrequencyTime } from '../components/measurement/FrequencyTime';
import { PolarQuestion } from '../components/measurement/PolarQuestion';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

export const ReviewAll = ({ setAuth }) => {
  const { id } = useParams();
  const [measurement, setMeasurement] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const fetchAllOpenTargetsForChild = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}allChildrenOpenTargets`,
          {
            method: 'GET',
            headers: { token: localStorage.token, child_id: id },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setTargets(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const targetResult = fetchAllOpenTargetsForChild().catch(
      console.error
    );
  }, []);

  useEffect(() => {
    //  setTargets(targets.filter((item) => item.target_id !== remove));
  }, []);

  const handleSaveAll = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}saveAllChildrenOpenTargets`,
        {
          method: 'POST',
          headers: { token: localStorage.token, child_id: id },
        }
      );
      const parseRes = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return !targets ? (
    <p>Loading....</p>
  ) : (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Revize
          </h1>
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
                      current={current}
                      fillForm={true}
                    />
                  );
                  break;
                case 'frequency':
                  currentMeasurmentComponent = (
                    <Frequency data={target} current={current} />
                  );
                  break;
                default:
                  currentMeasurmentComponent = (
                    <p>Typ měření neexistuje.</p>
                  );
              }

              return (
                <div
                  className="block bg-[#2563eb0f] px-4 py-4 mb-4 rounded-lg shadow-md  overflow-hidden"
                  key={`${target.measurement_id}`}>
                  {currentMeasurmentComponent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
