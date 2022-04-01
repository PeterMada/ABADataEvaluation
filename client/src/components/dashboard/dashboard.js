import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Card } from '../card/Card';

export const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allPersons, setAllPersons] = useState([]);
  const [allChildren, setAllChildren] = useState([]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out sucessfully');
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchPersonsList = async () => {
      // TODO get token from cookie
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}personsList`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      if (!isCancelled) {
        setAllPersons(parseRes);
      }
    };

    const fetchChildrenList = async () => {
      // TODO get token from cookie
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}childrenList`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      if (!isCancelled) {
        setAllChildren(parseRes);
      }
    };

    const fetchName = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}dashobard/`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      if (!isCancelled) {
        setName(`${parseRes.user_first_name} ${parseRes.user_last_name}`);
      }
    };

    const personsListResults = fetchPersonsList().catch(console.error);
    const childListResults = fetchChildrenList().catch(console.error);
    const nameResults = fetchName().catch(console.error);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Dashboard for {name}
      </h1>

      <div data-testid="personsListWrapper">
        <h2>Lists of people</h2>
        <div data-testid="personsListWrapper">
          {allPersons.length > 0 ? (
            <h3>Adam Peter</h3>
          ) : (
            <p>There are no people in list</p>
          )}
        </div>
      </div>

      <div data-testid="personsListWrapper" className="mt-10 mb-6">
        <h2>All children</h2>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {allChildren.length > 0 ? (
            allChildren.map((child) => {
              return (
                <div
                  className="bg-white p-10 rounded-lg shadow-md"
                  key={child.child_id}>
                  <Link
                    className=""
                    to={`/child/${child.child_id}`}
                    state={{
                      child,
                    }}>{`${child.child_first_name} ${child.child_last_name}`}</Link>
                </div>
              );
            })
          ) : (
            <p>There are no children in list</p>
          )}
        </div>
      </div>

      <button
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}>
        Log out
      </button>

      <Link
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/profile">
        Profile
      </Link>
      <Link
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/addPerson">
        Add new therapeutist
      </Link>
      <Link
        className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/addChild">
        Add new child
      </Link>
    </>
  );
};
