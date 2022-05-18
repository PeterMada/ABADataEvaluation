import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LeftMenu } from '../../components/leftMenu/LeftMenu';

export const AddChild = ({ setAuth }) => {
  const navigate = useNavigate();

  return (
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600 print:hidden">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Nový student
          </h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              childCode: '',
              sex: '',
              dateOfBirth: '',
              diagnosis: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.childCode) {
                errors.childCode = 'Pole je povinné';
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
                  toast.success('Student úspěšně přidán');

                  navigate(`/child/${parseRes.childId}`);
                } else {
                  toast.error(parseRes);
                }
              } catch (err) {
                console.log(err);
                toast.error('Jejda, načtení se nezdařilo!');
              }
            }}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form data-testid="addChildForm">
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="firstName">
                    Jméno
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="firstName"
                    id="firstName"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="lastName">
                    Příjmení
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="lastName"
                    id="lastName"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="childCode">
                    Kód studenta
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="childCode"
                    id="childCode"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="childCode"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="sex">
                    Pohlaví
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="sex"
                    id="sex">
                    <option />
                    <option value="Woman">Žena</option>
                    <option value="Man">Muž</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="dateOfBirth">
                    Datum narození
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    type="date"
                  />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block" htmlFor="diagnosis">
                    Diagnóza
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="diagnosis"
                    id="diagnosis"
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
                      Přidat
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
