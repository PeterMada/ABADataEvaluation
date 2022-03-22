import React from 'react';

export const SmallInfoBox = ({ name, info, img, imgAlt }) => {
  return (
    <>
      <img src={img} alt={imgAlt} />
      <h1>{name}</h1>
      <p>{info}</p>
    </>
  );
};
