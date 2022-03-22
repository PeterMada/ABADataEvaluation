import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';

export const Child = (props) => {
  let data = useLocation();
  console.log(data.state.child);

  return <>Child</>;
};
