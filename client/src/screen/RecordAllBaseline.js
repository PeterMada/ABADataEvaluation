import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LeftMenu } from '../components/leftMenu/LeftMenu';
import { Frequency } from '../components/measurement/Frequency';
import { FrequencyTime } from '../components/measurement/FrequencyTime';
import { PolarQuestion } from '../components/measurement/PolarQuestion';

export const RecordAllBaseline = ({ id, setAuth }) => {
  // const { id } = useParams();
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
        setTargets(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const targetResult = fetchProgramDetails().catch(console.error);
  }, [remove]);

  return !targets.length ? (
    ''
  ) : (
    <div className=" m-auto">
      <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
        Měření baseline
      </h2>
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
            <div className="" key={`${target.target_id}-${current}-${i}`}>
              <h2 className="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600">
                {target.target_title}
              </h2>
              <p>{target.target_description}</p>

              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all"
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
            console.log(target.target_type);
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
              case 'frequency':
                currentMeasurmentComponent = (
                  <FrequencyTime
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
                className=""
                key={`${target.target_id}-${current + 1}-${i}`}>
                {currentMeasurmentComponent}
              </div>
            );

            returnComponent.push(wrapedCommponent);
            return (
              <div className="block bg-[#2563eb0f] px-4 py-4 mb-4 rounded-lg shadow-md  overflow-hidden">
                {returnComponent}
              </div>
            );
          } else {
          }
        })}
      </div>
    </div>
  );
};
