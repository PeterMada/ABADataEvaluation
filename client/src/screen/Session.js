import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecordAll } from './RecordAll';
import { RecordAllBaseline } from './RecordAllBaseline';
import { LeftMenu } from '../components/leftMenu/LeftMenu';

export const Session = ({ setAuth }) => {
  const { id } = useParams();
  return (
    <div className=" m-auto">
      <div className="flex  flex-col-reverse md:flex-row">
        <div className=" md:border-r-2 md:border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full md:pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Měření
          </h1>
          <div>
            <RecordAllBaseline id={id} />
          </div>
          <div>
            <RecordAll id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
