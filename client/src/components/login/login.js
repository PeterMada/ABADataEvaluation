import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (values) => {
    try {
      const body = values;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        // TODO save token to cookie
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Přihlášení proběhlo úspěšně');
        navigate(`/dashboard`);
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      toast.error('Jejda, načtení se nezdařilo!');
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-xl m-auto">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-10 text-blue-600">
        Přihlášení
      </h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Povinné pole';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Špatná emailová adresa';
          }

          if (!values.password) {
            errors.password = 'Povinné pole';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitForm(values);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form data-testid="loginForm">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                type="email"
                id="email"
                name="email"
              />

              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="email"
                component="div"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Heslo
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:shadow-outline"
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="password"
                component="div"
              />
            </div>
            <div className="flex flex-col items-end justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}>
                Přihlásit se
              </button>

              <div className="mt-4">
                <Link
                  to="/register"
                  className="hover:underline hover:text-blue-600">
                  Registrace
                </Link>
                <Link
                  to="/resetPassword"
                  className="ml-4 hover:underline hover:text-blue-600">
                  Zapomenuté heslo?
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
