import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AddTarget = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>Add Target</h1>
      <Formik
        initialValues={{
          targetTitle: '',
          targetType: 'Select target type',
          targetDescription: '',
          targetBaselineFrom: '',
          targetBaselineTo: '',
          targetBaselineDone: '',
          targetBaselineCurrent: '',
          criterionFrom: '',
          criterionTo: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.targetTitle) {
            errors.targetTitle = 'Target title field is required';
          }

          if (values.targetType === 'Select target type') {
            errors.targetType = 'Target type field is required';
          }

          if (!values.criterionFrom) {
            errors.criterionFrom = 'Field is required';
          }

          if (!values.criterionTo) {
            errors.criterionTo = 'Field is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
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
            toast.error('Oops, failed to fetch!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addTarget">
            <div className="mb-4">
              <label htmlFor="targetTitle">Target title</label>
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
            <div className="mb-4">
              <label htmlFor="targetDescription">Description</label>
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
            <div className="mb-4">
              <label htmlFor="targetType">Target type</label>
              <Field
                className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                as="select"
                name="targetType"
                aria-label="Target type">
                <option value="Select target type">
                  Select target type
                </option>
                <option value="yes/no">Yes/no</option>
                <option value="prompt level">Prompt level</option>
                <option value="duration">Duration</option>
                <option value="frequency">Frequency</option>
                <option value="frequency/time">Frequency/time</option>
                <option value="text">Text</option>
              </Field>
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="targetType"
                component="div"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="targetBaselineFrom">Baseline From</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="targetBaselineFrom"
                name="targetBaselineFrom"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="targetBaselineFrom"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="targetBaselineTo">Baseline To</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="targetBaselineTo"
                name="targetBaselineTo"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="targetBaselineTo"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="targetBaselineCurrent">
                Baseline Current
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

            <div className="mb-4">
              <label>
                <Field type="checkbox" name="targetBaselineDone" />
                Baseline done
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="criterionFrom">Criterion From</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="criterionFrom"
                name="criterionFrom"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="criterionFrom"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="criterionTo">Criterion To</label>

              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="criterionTo"
                name="criterionTo"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="criterionTo"
                component="div"
              />
            </div>

            <div className="flex items-center justify-between">
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
                  Add target
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
