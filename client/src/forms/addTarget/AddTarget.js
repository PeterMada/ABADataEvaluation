import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LeftMenu } from '../../components/leftMenu/LeftMenu';

export const AddTarget = ({ setAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Přidat cíl
          </h1>
          <Formik
            initialValues={{
              targetTitle: '',
              targetDescription: '',
              targetBaselineCurrent: '',
              targetBaselineDone: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.targetTitle) {
                errors.targetTitle = 'Pole je povinné';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_API_URL}addTarget`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                      token: localStorage.token,
                      program_id: id,
                    },
                    body: JSON.stringify(values),
                  }
                );

                const parseRes = await response.json();
                if (parseRes.targetId) {
                  toast.success('Target added succesfully');
                  navigate(`/target/${parseRes.targetId}`);
                } else {
                  toast.error(parseRes);
                }
              } catch (err) {
                toast.error('Jejda, načtení se nezdařilo!');
              }
            }}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form data-testid="addTarget">
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="targetTitle">
                    Název cílu
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="targetTitle"
                    name="targetTitle"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="targetTitle"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="targetDescription">
                    Popis
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    as="textarea"
                    id="targetDescription"
                    name="targetDescription"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="targetDescription"
                    component="div"
                  />
                </div>

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="targetBaselineCurrent">
                    Aktuální baseline
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="targetBaselineCurrent"
                    name="targetBaselineCurrent"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="targetBaselineCurrent"
                    component="div"
                  />
                </div>

                <div className="mb-8">
                  <label className="flex items-center	mb-2">
                    <Field type="checkbox" name="targetBaselineDone" />
                    <span className="ml-2">Baseline je hotov</span>
                  </label>
                </div>

                <div className="flex flex-col items-end justify-end mt-10">
                  {!isSubmitting ? (
                    <button
                      className={
                        (!dirty || !isValid
                          ? 'opacity-50 cursor-not-allowed '
                          : '') +
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      }
                      type="submit"
                      disabled={!dirty || !isValid}>
                      Přidat
                    </button>
                  ) : (
                    <span
                      className="inline-flex items-center px-4 py-2 font-bold leading-6  shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed"
                      data-testid="processBtn">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Probíhá zpracování...
                    </span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
