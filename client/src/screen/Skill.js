import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ProgramBox } from '../components/programBox/ProgramBox';

export const Skill = () => {
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
        console.log(parseRes);
        setCurrentSkill(parseRes.skillDetail);
        setCurrentPrograms(parseRes.allPrograms);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchSkillDetail().catch(console.error);
  }, []);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        {currentSkill.skill_title}
      </h1>
      <p>Some information about current skill</p>

      <div>
        <h2>All program for this skill</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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

      <div className="mt-6 mb-10">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addProgram/${id}`}>
          Add new program to this skill
        </Link>
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/editSkill/${id}`}>
          Edit this skill
        </Link>
      </div>
    </>
  );
};
