import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const SkillBox = ({ skill, programs }) => {
  const { id } = useParams();

  return (
    <div className="block bg-white px-4 py-4 rounded-lg shadow-md transition-shadow overflow-hidden">
      <h3 className="text-xl font-bold mb-6">{skill.skill_title}</h3>

      {skill.skill_description ? <p>{skill.skill_description}</p> : ''}

      <div className="mt-6 flex flex-col text-right">
        <Link
          className="hover:underline hover:text-blue-600"
          to={`/skill/${skill.skill_id}`}>
          Detail dovednosti
        </Link>
        <Link
          className="hover:underline hover:text-blue-600"
          to={`/addProgram/${skill.skill_id}`}>
          Přidat program
        </Link>
      </div>
    </div>
  );
};

/*

      <div className="mt-4 grid gap-5">
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
*/
