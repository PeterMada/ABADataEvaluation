import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AddProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>Nový program</h1>
      <Formik
        initialValues={{
          programTitle: '',
          programDescription: '',
          programBaselineFrom: '',
          programBaselineTo: '',
          programBaselineDone: '',
          programBaselineCurrent: '',
          targetBaselineFrom: '',
          targetBaselineTo: '',
          targetCriterionFrom: '',
          targetCriterionTo: '',
          targetType: 'Vyberte typ cíle',
        }}
        validate={(values) => {
          // TODO validate only numbers
          const errors = {};
          if (!values.programTitle) {
            errors.programTitle = 'Pole je povinné';
          }

          if (!values.programBaselineFrom) {
            errors.programBaselineFrom = 'Pole je povinné';
          }

          if (!values.targetBaselineFrom) {
            errors.targetBaselineFrom = 'Pole je povinné';
          }
          if (!values.targetBaselineTo) {
            errors.targetBaselineTo = 'Pole je povinné';
          }
          if (!values.targetCriterionFrom) {
            errors.targetCriterionFrom = 'Pole je povinné';
          }
          if (!values.targetCriterionTo) {
            errors.targetCriterionTo = 'Pole je povinné';
          }
          if (values.targetType === 'Vyberte typ cíle') {
            errors.targetType = 'Pole je povinné';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}addProgram`,
              {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  token: localStorage.token,
                  skill_id: id,
                },
                body: JSON.stringify(values),
              }
            );

            const parseRes = await response.json();
            if (parseRes.programId) {
              toast.success('Program úspěšně přidán');
              navigate(`/program/${parseRes.programId}`);
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Jejda, načtení se nezdařilo!');
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
              <label htmlFor="programBaselineFrom">
                Program Baseline from
              </label>
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
              <label htmlFor="programBaselineTo">
                Program Baseline To
              </label>

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
                Program Baseline done
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="programBaselineCurrent">
                Program Baseline Current
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

            <div className="mb-4">
              <label htmlFor="targetBaselineFrom">
                Targets Baseline From
              </label>

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
              <label htmlFor="targetBaselineTo">Targets Baseline to</label>

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
              <label htmlFor="targetCriterionFrom">
                Targets Criterion From
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="targetCriterionFrom"
                name="targetCriterionFrom"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="targetCriterionFrom"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="targetCriterionTo">
                Targets Criterion To
              </label>

              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="targetCriterionTo"
                name="targetCriterionTo"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="targetCriterionTo"
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
                  Add program
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
