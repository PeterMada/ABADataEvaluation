import React from 'react';
import { useParams } from 'react-router-dom';
import { FrequencyTime } from '../components/measurement/FrequencyTime';

export const Recording = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Recording page</h1>
    </>
  );
};
