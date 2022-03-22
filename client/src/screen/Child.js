import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { SmallInfoBox } from '../components/smallInfoBox/SmallInfoBox';

export const Child = (props) => {
  const data = useLocation();
  const currentChild = data.state.child;

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
    </>
  );
};
