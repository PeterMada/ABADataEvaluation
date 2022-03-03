import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(process.env.API_URL);
    try {
      const body = { email, password, name };
      console.log(JSON.stringify(body));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        //TODO store token in cookie
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Registered succesfully');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Register
      </h1>
      <form onSubmit={onSubmitForm}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Register
          </button>
        </div>
      </form>

      <Link to="/login">Login</Link>
    </>
  );
};
