import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddChild = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Add Child
      </h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          childCode: '',
          sex: '',
          dateOfBirth: '',
          diagnosis: '',
          photo: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name field is required';
          }

          if (!values.lastName) {
            errors.lastName = 'Last name field is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}addChild`,
              {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  token: localStorage.token,
                },
                body: JSON.stringify(values),
              }
            );
            const parseRes = await response.json();

            if (parseRes.childId) {
              toast.success('Child added succesfully');
              //setSubmitted(true);
              navigate(`/child/${parseRes.childId}`);
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            console.log(err);
            toast.error('Oops, failed to fetch!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addChildForm">
            <div className="mb-4">
              <label htmlFor="firstName">First Name</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="firstName"
                id="firstName"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="firstName"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">Last Name</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="lastName"
                id="lastName"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="lastName"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="childCode">Child Code</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="childCode"
                id="childCode"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sex">Sex</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="sex"
                id="sex">
                <option />
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="dateOfBirth"
                id="dateOfBirth"
                type="date"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="diagnosis">Diagnosis</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="diagnosis"
                id="diagnosis"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="photo">Photo</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="photo"
                id="photo"
                type="file"
                accept="image/*"
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
    </>
  );
};
