import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const EditProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProgram, setCurrentProgram] = useState([]);

  useEffect(() => {
    const fetchSkillDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}programDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, program_id: id },
          }
        );
        const parseRes = await response.json();
        setCurrentProgram(parseRes.programDetail);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchSkillDetail().catch(console.error);
  }, []);

  return !currentProgram.program_title ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>Edit Program</h1>
      <Formik
        initialValues={{
          programTitle: currentProgram.program_title,
          programDescription: currentProgram.program_description,
          programBaselineFrom: currentProgram.program_baseline_from,
          programBaselineTo: currentProgram.program_baseline_to,
          programBaselineDone: currentProgram.program_baseline_done,
          programBaselineCurrent: currentProgram.program_baseline_result,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.programTitle) {
            errors.programTitle = 'Program title field is required';
          }

          if (!values.programBaselineFrom) {
            errors.programBaselineFrom = 'Field is required';
          }

          if (!values.programBaselineTo) {
            errors.programBaselineTo = 'Field is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}editProgram`,
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
            if (parseRes.programId) {
              toast.success('Program updated succesfully');
              navigate(`/program/${parseRes.programId}`);
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Oops, server error!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addProgram">
            <div className="mb-4">
              <label htmlFor="programTitle">Program title</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="programTitle"
                name="programTitle"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="programTitle"
                component="div"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="programDescription">Description</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                as="textarea"
                id="programDescription"
                name="programDescription"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="programDescription"
                component="div"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="programBaselineFrom">Baseline</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="programBaselineFrom"
                name="programBaselineFrom"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="programBaselineFrom"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="programBaselineTo">Baseline To</label>

              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="programBaselineTo"
                name="programBaselineTo"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="programBaselineTo"
                component="div"
              />
            </div>

            <div className="mb-4">
              <label>
                <Field type="checkbox" name="programBaselineDone" />
                Baseline done
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="programBaselineCurrent">
                Baseline Current
              </label>

              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="programBaselineCurrent"
                name="programBaselineCurrent"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="programBaselineCurrent"
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
                  Save program
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
