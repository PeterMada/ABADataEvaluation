import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Card = ({ child }) => {
  const percentage = 66;
  return (
    <div style={{ width: 200, height: 200 }}>
      <h3>{`${child.child_first_name} ${child.child_last_name}`}</h3>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
};
