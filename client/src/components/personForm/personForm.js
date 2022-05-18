import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'whatwg-fetch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { LeftMenu } from '../leftMenu/LeftMenu';

export const PersonForm = ({ setAuth }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Nový teraput
          </h1>
          <Formik
            initialValues={{
              beforeNameTitle: '',
              firstName: '',
              lastName: '',
              afterNameTitle: '',
              email: '',
              emailConfirm: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = 'Pole jméno je povinné';
              }

              if (!values.lastName) {
                errors.lastName = 'Pole příjmení je povinné';
              }

              if (!values.email) {
                errors.email = 'Pole email je povinné';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.email
                )
              ) {
                errors.email = 'Neplatná emailová adresa';
              }

              if (!values.emailConfirm) {
                errors.emailConfirm = 'Pole potvrzení emailu je povinné';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.emailConfirm
                )
              ) {
                errors.emailConfirm = 'Neplatná emailová adresa';
              }

              if (
                values.email &&
                values.emailConfirm &&
                values.email !== values.emailConfirm
              ) {
                errors.emailConfirm = 'Email se neshoduje';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_API_URL}addPerson`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  }
                );

                const parseRes = await response.json();
                if (parseRes.personID) {
                  toast.success('Person added succesfully');
                  //setSubmitted(true);
                } else {
                  toast.error(parseRes);
                }
              } catch (err) {
                toast.error('Jejda, načtení se nezdařilo!');
              }
            }}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form data-testid="addPerson">
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="beforeNameTitle">
                    Tituly před jménem
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="beforeNameTitle"
                    name="beforeNameTitle"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="firstName">
                    Jméno
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    name="firstName"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="firstName"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="lastName">
                    Příjmení
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    name="lastName"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="lastName"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="afterNameTitle">
                    Tituly za jménem
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="afterNameTitle"
                    name="afterNameTitle"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="emailConfirm">
                    Potvrzení emailu
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="emailConfirm"
                    name="emailConfirm"
                    type="email"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="emailConfirm"
                    component="div"
                  />
                </div>

                <div className="flex flex-col items-end justify-end mt-10">
                  {!isSubmitting ? (
                    <button
                      className={
                        (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      }
                      type="submit"
                      disabled={!dirty}>
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
