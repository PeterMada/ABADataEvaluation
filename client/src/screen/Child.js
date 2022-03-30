import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { SmallInfoBox } from '../components/smallInfoBox/SmallInfoBox';

export const Child = (props) => {
  const data = useLocation();
  const [currentChild, setCurrentChild] = useState([]);
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
        setCurrentChild(parseRes);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchChildDetail().catch(console.error);
  }, []);

  return (
    <>
      {data.state.child ? (
        <SmallInfoBox
          name={`${currentChild.child_first_name} ${currentChild.child_last_name}`}
          info={``}
        />
      ) : (
        <p>Person does not exist</p>
      )}

      <div className="mt-6">
        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to={`/addSkill/${id}`}>
          Add Skill
        </Link>

        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/addSkill">
          Add Program
        </Link>

        <Link
          className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/addSkill">
          Add Target
        </Link>
      </div>
    </>
  );
};
