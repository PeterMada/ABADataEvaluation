import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Register = ({ setAuth }) => {
  return (
    <div className="max-w-xl m-auto">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-10 text-blue-600">
        Registrace
      </h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
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
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Špatná emailová adresa';
          }

          if (!values.password) {
            errors.password = 'Heslo nemůže být prázdné';
          } else if (values.password.length < 8) {
            errors.password = 'Heslo musí mít minimálne 8 znaků';
          }

          if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Potvrzení hesla nemůže být prázdné';
          }

          if (
            values.password &&
            values.passwordConfirm &&
            values.password !== values.passwordConfirm
          ) {
            errors.passwordConfirm = 'Hesla musí být shodná';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}auth/register`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(values),
              }
            );

            const parseRes = await response.json();
            if (parseRes.token) {
              //TODO store token in cookie
              localStorage.setItem('token', parseRes.token);
              setAuth(true);
              toast.success('Úspěšná registrace');
            } else {
              setAuth(false);
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Jejda, načtení se nezdařilo!');
            console.error(err.message);
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="registerForm">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName">
                Jméno
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="firstName"
                name="firstName"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="firstName"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName">
                Příjmení
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="lastName"
                name="lastName"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="lastName"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Heslo
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="password"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordConfirm">
                Potvrďte heslo
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="passwordConfirm"
                component="div"
              />
            </div>

            <div className="flex flex-col items-end justify-end">
              {!isSubmitting ? (
                <button
                  className={
                    (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline'
                  }
                  type="submit"
                  disabled={!dirty}>
                  Registrovat
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

              <div className="mt-4">
                <Link
                  to="/login"
                  className="hover:underline hover:text-blue-600">
                  Přihlášení
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
