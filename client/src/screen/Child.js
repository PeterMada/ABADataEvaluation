import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { SmallInfoBox } from '../components/smallInfoBox/SmallInfoBox';
import { SkillBox } from '../components/skillBox/SkillBox';

export const Child = (props) => {
  const data = useLocation();
  // TODO show loading
  const [currentChild, setCurrentChild] = useState([]);
  const [currentSkills, setCurrentSkills] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}childDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, child_id: id },
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        setCurrentChild(parseRes.childDetails);
        setCurrentSkills(parseRes.allSkils);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchChildDetail().catch(console.error);
  }, []);

  return (
    <>
      {currentChild ? (
        <SmallInfoBox
          name={`${currentChild.child_first_name} ${currentChild.child_last_name}`}
          info={``}
        />
      ) : (
        <p>Loading child details</p>
      )}

      <div className="mt-6 mb-6">
        <h2>All child skills</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {currentSkills
            ? currentSkills.map((skill) => {
                return (
                  <SkillBox
                    key={skill.skill.skill_id}
                    skill={skill.skill}
                    programs={skill.programs}
                  />
                );
              })
            : 'There are no skills for this child'}
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addSkill/${id}`}>
          Add Skill
        </Link>
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/session/${id}`}>
          Start session
        </Link>
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/reviewAll/${id}`}>
          Review open session
        </Link>
      </div>
    </>
  );
};
