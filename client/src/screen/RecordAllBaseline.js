import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Frequency } from '../components/measurement/Frequency';
import { FrequencyTime } from '../components/measurement/FrequencyTime';
import { PolarQuestion } from '../components/measurement/PolarQuestion';

export const RecordAllBaseline = () => {
  const { id } = useParams();
  const [targets, setTargets] = useState([]);
  const [remove, setRemove] = useState();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}allChildrenTargets`,
          {
            method: 'GET',
            headers: {
              token: localStorage.token,
              child_id: id,
              only_baseline: true,
            },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setTargets(parseRes);
      } catch (err) {
        console.error(err);
      }
    };
    console.log('REMOVE RUNN');

    const targetResult = fetchProgramDetails().catch(console.error);
  }, [remove]);

  return !targets ? (
    <p>Loading....</p>
  ) : (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Record all baseline page
      </h1>
      <div>
        {targets.map((target, current) => {
          let returnComponent = [];
          let currentMeasurmentComponent;
          let i = 0;
          const repeatNumber =
            target.target_criterion_to - parseInt(target.alreadymeasured);
          const done = parseInt(target.alreadymeasured);
          const from = target.target_criterion_to;
          const alreadyDone = (done / from) * 100;

          returnComponent.push(
            <div key={`${target.target_id}-${current}-${i}`}>
              <h2 className="font-medium leading-tight text-4xl mt-6 mb-2 text-blue-600">
                Baseline test for {target.target_title}
              </h2>
              <p>{target.target_description}</p>
              <div>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{
                      width: `${alreadyDone < 5 ? 5 : alreadyDone}%`,
                    }}>
                    {`${done}/${from}`}
                  </div>
                </div>
              </div>
            </div>
          );

          if (repeatNumber > 0) {
            switch (target.target_type) {
              case 'yes/no':
                currentMeasurmentComponent = (
                  <PolarQuestion
                    key={`${target.target_id}-${i}-${current}`}
                    data={target}
                    setRemove={setRemove}
                    current={current}
                    doNotShowDetails={true}
                  />
                );
                break;
              default:
                currentMeasurmentComponent = (
                  <p>Measurement type does not exist.</p>
                );
            }
            const wrapedCommponent = (
              <div
                className="mt-4 mb-4"
                key={`${target.target_id}-${current + 1}-${i}`}>
                {currentMeasurmentComponent}
              </div>
            );

            returnComponent.push(wrapedCommponent);
            return returnComponent;
          } else {
          }

          /*
          const testArray = Array.from({ length: repeatNumber });

          const test = testArray.map((t) => {
            i++;
            let currentMeasurmentComponent;

            switch (target.target_type) {
              case 'yes/no':
                currentMeasurmentComponent = (
                  <PolarQuestion
                    key={`${target.target_id}-${i}-${current}`}
                    data={target}
                    setRemove={setRemove}
                    current={current}
                    doNotShowDetails={true}
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
                className="mt-4 mb-4"
                key={`${target.target_id}-${current}-${i}`}>
                {currentMeasurmentComponent}
              </div>
            );
          });

          returnComponent.push(test);
          return returnComponent;

          /*
          for (let i = 0; i < repeatNumber; i++) {
            let currentMeasurmentComponent;

            switch (target.target_type) {
              case 'yes/no':
                currentMeasurmentComponent = (
                  <PolarQuestion
                    data={target}
                    setRemove={setRemove}
                    current={current}
                    doNotShowDetails={true}
                  />
                );
                break;
              default:
                currentMeasurmentComponent = (
                  <p>Measurement type does not exist.</p>
                );
            }

            returnComponent.push(
              <div className="mt-4 mb-4" key={`${target.target_id}-${i}`}>
                {currentMeasurmentComponent}
              </div>
            );

            //
          }

          return returnComponent;
          */
        })}
      </div>
    </>
  );
};
