import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecordAll } from './RecordAll';
import { RecordAllBaseline } from './RecordAllBaseline';

export const Session = () => {
  const { id } = useParams();
  return (
    <>
      Session
      <div>
        <RecordAllBaseline id={id} />
      </div>
      <div>
        <RecordAll id={id} />
      </div>
    </>
  );
};
