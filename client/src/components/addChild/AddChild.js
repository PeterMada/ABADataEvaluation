import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const AddChild = () => {
  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Add Child
      </h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
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
        onSubmit={async (values, { setSubmitting }) => {}}>
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
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="dateOfBirth"
                id="dateOfBirth"
                type="date"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="diagnosis">Diagnosis</label>
              <input name="diagnosis" id="diagnosis" />
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
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
