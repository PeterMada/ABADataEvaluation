import React from 'react';

export const SmallInfoBox = ({ name, info, img, imgAlt }) => {
  return (
    <>
      <img src={img} alt={imgAlt} />
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        {name}
      </h1>
      <p>{info}</p>
    </>
  );
};
