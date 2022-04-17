import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { TargetBox } from '../components/targetBox/TargetBox';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';

import { Line } from 'react-chartjs-2';

export const Program = () => {
  const [currentProgram, setCurrentProgram] = useState([]);
  const [currentTargets, setCurrentTargets] = useState([]);
  const { id } = useParams();
  const [labels, setLabels] = useState([]);
  const [completedTargets, setCompletedTargets] = useState([]);
  const [completedBaseline, setCompletedBaseline] = useState([]);

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
        console.log(parseRes);
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
        for (let i = dayDiference; i >= 0; i--) {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() - i);

          labelDates.push(d.toLocaleDateString('en-GB'));
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
          const prevTargetCompleted = targetsCompleted[j - 1]
            ? targetsCompleted[j - 1]
            : 0;

          //console.log(targetsCompleted);
          targetsCompleted.push(
            prevTargetCompleted + targetCompleted.length
          );
          j++;
        }

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
        max: currentProgram.program_baseline_from,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  console.log(currentProgram);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        {currentProgram.program_title}
      </h1>
      <p>{currentProgram.program_description}</p>
      <p>{`Baseline: ${currentProgram.program_baseline_from}/${currentProgram.program_baseline_to}`}</p>
      <p>{`Measured baseline: ${currentProgram.program_baseline_result}`}</p>
      <p>{`Measured done: ${
        currentProgram.program_baseline_done ? 'Yes' : 'No'
      }`}</p>

      <div className="mt-10 mb-10 w-2/4	">
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
        <h2>All targets for this program</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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

      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addTarget/${id}`}>
          Add new target to this program
        </Link>
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/editProgram/${id}`}>
          Edit program
        </Link>
      </div>
    </>
  );
};
