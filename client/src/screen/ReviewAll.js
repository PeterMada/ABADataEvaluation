import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export const ReviewAll = () => {
  const { id } = useParams();
  const [ measurement, setMeasurement] = useState([]);
  const [ targets, setTargets] = useState([]);

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
        setMeasurement(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const targetResult = fetchAllOpenTargetsForChild().catch(console.error);
  }, []);

  useEffect(() => {
  //  setTargets(targets.filter((item) => item.target_id !== remove));
  }, []);

  return <>test</>;
  /*
  return !targets ? (
    <p>Loading....</p>
  ) : (
    <>
      Record all page
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
            <div className="mt-4 mb-4" key={target.target_id}>
              {currentMeasurmentComponent}
            </div>
          );
        })}
      </div>
    </>
  );
  */
};
