import React from 'react';
import { Link } from 'react-router-dom';

export const SkillBox = ({ skill, programs }) => {
  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{skill.skill_title}</h3>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {programs.map((program) => {
            return (
              <div
                key={program.program_id}
                className="bg-white p-2 rounded-lg shadow-md">
                <h4>{program.program_title}</h4>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <Link
            className="bg-blue-500  ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/skill/${skill.skill_id}`}>
            Skill detail
          </Link>
        </div>
      </div>
    </>
  );
};
