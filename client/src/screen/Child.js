import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SmallInfoBox } from '../components/smallInfoBox/SmallInfoBox';
import { SkillBox } from '../components/skillBox/SkillBox';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

export const Child = ({ setAuth }) => {
  const data = useLocation();

  const [isLoading, setIsLoading] = useState(true);
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
        setCurrentChild(parseRes.childDetails);
        setCurrentSkills(parseRes.allSkils);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChildDetail().catch(console.error);
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
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            {`${currentChild?.child_first_name} ${currentChild?.child_last_name}`}
          </h1>

          <div className="mt-10 mb-6">
            <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
              Dovednosti
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
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

          <div className="mt-16 text-right">
            <Link
              className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/addSkill/${id}`}>
              Přidejte dovednost
            </Link>
            <Link
              className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/session/${id}`}>
              Zahájit relaci
            </Link>
            <Link
              className="inline-block bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/reviewAll/${id}`}>
              Revizne relace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
