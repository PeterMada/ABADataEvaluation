import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
