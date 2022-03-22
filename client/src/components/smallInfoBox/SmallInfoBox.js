import React from 'react';

export const SmallInfoBox = ({ name, info }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>{info}</p>
    </>
  );
};
