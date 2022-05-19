import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { TargetBox } from '../components/targetBox/TargetBox';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

import { Line } from 'react-chartjs-2';

export const Program = ({ setAuth }) => {
  const [currentProgram, setCurrentProgram] = useState([]);
  const [currentTargets, setCurrentTargets] = useState([]);
  const { id } = useParams();
  const [labels, setLabels] = useState([]);
  const [completedTargets, setCompletedTargets] = useState([]);
  const [completedBaseline, setCompletedBaseline] = useState([]);
  const [garaphMax, setGaraphMax] = useState(0);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}programDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, program_id: id },
          }
        );
        const parseRes = await response.json();
        setCurrentProgram(parseRes.programDetail);
        setCurrentTargets(parseRes.results);

        const today = new Date();
        const programStartDate = parseRes.programDetail.program_created;
        const diference =
          today.getTime() - new Date(programStartDate).getTime();
        const dayDiference =
          diference / (1000 * 3600 * 24) < 0.5
            ? 0
            : Math.ceil(diference / (1000 * 3600 * 24));
        let labelDates = ['baseline'];
        let targetsCompleted = [null];
        let j = 0;
        let kumulative = 0;

        for (let i = dayDiference; i >= 0; i--) {
          j++;
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() - i);

          const targetCompleted = parseRes.allTargets.filter((target) => {
            const targetCompletedDate = new Date(
              target.target_completed_time
            );
            targetCompletedDate.setHours(0, 0, 0, 0);

            if (
              (target.target_complete ||
                target.target_done_from_baseline) &&
              targetCompletedDate.toDateString() === d.toDateString()
            ) {
              return true;
            }
          });

          if (targetCompleted.length > 0) {
            labelDates.push(d.toLocaleDateString('en-GB'));
            kumulative += targetCompleted.length;
          }

          targetsCompleted.push(kumulative);

          /*
          const prevTargetCompleted = targetsCompleted[j - 1]
            ? targetsCompleted[j - 1]
            : 0;

          targetsCompleted.push(
            prevTargetCompleted + targetCompleted.length
          );
          */
        }

        setGaraphMax(kumulative);
        setLabels(labelDates);
        setCompletedTargets(targetsCompleted);

        const targetBaselineCompleted = parseRes.allTargets.filter(
          (target) => {
            if (target.target_done_from_baseline) {
              return true;
            }
          }
        );

        let baselineLine = [];
        const targetsCompletedMap = targetsCompleted;
        targetsCompletedMap.map((target) => {
          baselineLine.push(targetBaselineCompleted.length);
        });

        setCompletedBaseline(baselineLine);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchProgramDetails().catch(console.error);
  }, []);

  let options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        max:
          garaphMax >= currentProgram.program_baseline_from
            ? garaphMax + 4
            : currentProgram.program_baseline_from
            ? currentProgram.program_baseline_from
            : 4,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className=" m-auto">
      <div className="flex  flex-col-reverse md:flex-row">
        <div className=" md:border-r-2 md:border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full md:pl-10 ">
          <h1 className="font-medium leading-tight text-5xl mt-0 mb-6 text-blue-600">
            {currentProgram.program_title} <br />
            {currentProgram.program_code}
          </h1>
          <p className="mb-4 block">
            {currentProgram.program_description}
          </p>
          <p>{`Baseline programu: ${currentProgram.program_baseline_from}/${currentProgram.program_baseline_to}`}</p>
          <p>{`Naměřená baseline: ${currentProgram.program_baseline_result}`}</p>

          <div className="mt-10 mb-10">
            <Line
              datasetIdKey="id"
              data={{
                labels: labels,
                datasets: [
                  {
                    id: 1,
                    label: '',
                    data: completedTargets,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    id: 2,
                    label: '',
                    data: [currentProgram.program_baseline_result],
                    borderColor: 'rgb(51, 204, 51)',
                    backgroundColor: 'rgba(51, 204, 51, 0.5)',
                  },
                ],
              }}
              options={options}
            />
          </div>

          <div className="mt-10">
            <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
              Všechny cíle programu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentTargets.map((target) => {
                let programDonePercentage = 0;
                let baselineStart = 0;
                let baselineFinish = currentProgram.target_criterion_from;

                target.measurements.map((meas) => {
                  if (meas.question_result === true) {
                    baselineStart++;
                  } else {
                    return;
                  }
                });

                programDonePercentage = Math.floor(
                  (baselineStart / baselineFinish) * 100
                );

                return (
                  <TargetBox
                    key={target.target.target_id}
                    target={target.target}
                    percentageDone={programDonePercentage}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-right print:hidden">
            <Link
              className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/addTarget/${id}`}>
              Přidat nový cíl
            </Link>
            <Link
              className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/editProgram/${id}`}>
              Upravit program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
