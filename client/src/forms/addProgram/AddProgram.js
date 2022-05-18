import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LeftMenu } from '../../components/leftMenu/LeftMenu';

export const AddProgram = ({ setAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Nový program
          </h1>
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
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="programTitle">
                    Název programu
                  </label>
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

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="programDescription">
                    Popis
                  </label>
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

                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="targetType">
                    Typ cíle
                  </label>
                  <Field
                    className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    as="select"
                    name="targetType"
                    aria-label="Target type">
                    <option value="Select target type">
                      Vyberte typ cíle
                    </option>
                    <option value="yes/no">Ano/Ne</option>
                    <option value="frequency">Frekvence</option>
                    <option value="prompt level" disabled>
                      Úroveň promptu
                    </option>
                    <option value="duration" disabled>
                      Doba trvání
                    </option>
                    <option value="text" disabled>
                      Text
                    </option>
                  </Field>
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="targetType"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="programBaselineFrom">
                    Program baseline <strong>od</strong>
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
                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="programBaselineTo">
                    Program baseline <strong>do</strong>
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

                <div className="mb-8">
                  <label className="flex items-center	mb-2">
                    <Field type="checkbox" name="programBaselineDone" />
                    <span className="ml-2">
                      Baseline programu je hotový
                    </span>
                  </label>
                </div>

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="programBaselineCurrent">
                    Aktuální baseline programu
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

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="targetBaselineFrom">
                    Baseline cíle <strong>od</strong>
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

                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="targetBaselineTo">
                    Baseline cíle <strong>do</strong>
                  </label>

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

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="targetCriterionFrom">
                    Kritérium cíle <strong>od</strong>
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
                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="targetCriterionTo">
                    Kritérium cíle <strong>do</strong>
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

                <div className="flex flex-col items-end justify-end mt-10">
                  {!isSubmitting ? (
                    <button
                      className={
                        (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      }
                      type="submit"
                      disabled={!dirty}>
                      Přidat program
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
