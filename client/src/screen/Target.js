import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Target = () => {
  const [curretnTarget, setCurretnTarget] = useState([]);
  const { id } = useParams();

  return (
    <>
      <h1>Target detail page</h1>
      <p>Some information about current target</p>
    </>
  );
};
