import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ProgramBox } from '../components/programBox/ProgramBox';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

export const Skill = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSkill, setCurrentSkill] = useState([]);
  const [currentPrograms, setCurrentPrograms] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSkillDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}skillDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, skill_id: id },
          }
        );
        const parseRes = await response.json();

        setCurrentSkill(parseRes.skillDetail);
        setCurrentPrograms(parseRes.allPrograms);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchSkillDetail().catch(console.error);
  }, []);

  return isLoading ? (
    ''
  ) : (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>

        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-4 text-blue-600">
            {currentSkill.skill_title}
          </h1>
          <p>Lorem ipsum</p>

          <div className="mt-10 mb-6">
            <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
              Všechny programy pro tuto dovednost
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-5">
              {currentPrograms.map((program) => {
                return (
                  <ProgramBox
                    key={program.program.program_id}
                    program={program.program}
                    targets={program.targets}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-right">
            <Link
              className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/addProgram/${id}`}>
              Nový program
            </Link>
            <Link
              className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/editSkill/${id}`}>
              Upravit dovednost
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
