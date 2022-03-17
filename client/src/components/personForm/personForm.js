import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'whatwg-fetch';

export const PersonForm = () => {
  return (
    <div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Add Person
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
            errors.firstName = 'First name field is required';
          }

          if (!values.lastName) {
            errors.lastName = 'Last name field is required';
          }

          if (!values.email) {
            errors.email = 'Email field is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.emailConfirm) {
            errors.emailConfirm = 'Email confirmation field is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.emailConfirm
            )
          ) {
            errors.emailConfirm = 'Invalid email address';
          }

          if (
            values.email &&
            values.emailConfirm &&
            values.email !== values.emailConfirm
          ) {
            errors.emailConfirm = 'Email Not Matching';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // TODO Fix fetch

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
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Oops, failed to fetch!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addPerson">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="beforeNameTitle">
                Titles before name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="beforeNameTitle"
                name="beforeNameTitle"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName">
                First Name
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName">
                Last Name
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="afterNameTitle">
                Titles after name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="afterNameTitle"
                name="afterNameTitle"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="emailConfirm">
                Email confirmation
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

            <div className="flex items-center justify-between">
              {!isSubmitting ? (
                <button
                  className={
                    (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  }
                  type="submit"
                  disabled={!dirty}>
                  Add
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
                  Processing...
                </span>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
