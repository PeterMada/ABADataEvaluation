import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LeftMenu } from '../../components/leftMenu/LeftMenu';

export const EditProgram = ({ setAuth }) => {
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
    ''
  ) : (
    <div className=" m-auto">
      <div className="flex  flex-col-reverse md:flex-row">
        <div className=" md:border-r-2 md:border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full md:pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Upravit program
          </h1>
          <Formik
            initialValues={{
              programTitle: currentProgram.program_title,
              programCode: currentProgram.program_code,
              programBaselineFrom: currentProgram.program_baseline_from,
              programBaselineTo: currentProgram.program_baseline_to,
              programBaselineDone: currentProgram.program_baseline_done,
              programBaselineCurrent:
                currentProgram.program_baseline_result,
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

              if (values.programCode === 'Vyberte typ cíle') {
                errors.programCode = 'Pole je povinné';
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
                  toast.success('Program byl úspěšně aktualizován');
                  navigate(`/program/${parseRes.programId}`);
                } else {
                  toast.error(parseRes);
                }
              } catch (err) {
                toast.error('Jejda, chyba serveru!');
              }
            }}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form data-testid="addProgram">
                <div className="mb-4">
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
                  <label className="mb-2 block" htmlFor="programCode">
                    Kód programu
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="programCode"
                    name="programCode"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="programCode"
                    component="div"
                  />
                </div>

                <div className="mb-8">
                  <label
                    className="mb-2 block"
                    htmlFor="programBaselineFrom">
                    Baseline od
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
                    Baseline do
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
                    Aktuální baseline
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

                <div className="flex flex-col items-end justify-end mt-10">
                  {!isSubmitting ? (
                    <button
                      className={
                        (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      }
                      type="submit"
                      disabled={!dirty}>
                      Uložit
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
