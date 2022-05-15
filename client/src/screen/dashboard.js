import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Card } from '../components/card/Card';
import { LeftMenu } from '../components/leftMenu/LeftMenu';
import profileImage from '../assets/images/profile-placeholder.png';

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
    <div className=" m-auto">
      <div className="flex">
        <div className=" border-r-2 border-blue-600">
          <LeftMenu setAuth={setAuth} />
        </div>
        <div className="w-full pl-10 ">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-10 text-blue-600">
            Dashboard
          </h1>

          <div data-testid="personsListWrapper" className="mt-10 mb-6">
            <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
              Studenti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {allChildren.length > 0 ? (
                allChildren.map((child) => {
                  return (
                    <div key={child.child_id}>
                      <Link
                        className="block bg-white px-4 py-4 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                        to={`/child/${child.child_id}`}
                        state={{
                          child,
                        }}>
                        <div className="flex mb-6">
                          <img
                            src={profileImage}
                            alt="Logo"
                            className="w-12 h-12 rounded-lg"
                          />
                          <h3 className="font-medium ml-4 text-lg">{`${child.child_first_name} ${child.child_last_name}`}</h3>
                        </div>
                        <div>
                          <p>Počet cielov: 10</p>
                          <p>Hotových cielov: 4</p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>V seznamu nejsou žádný studenti</p>
              )}
            </div>

            {allChildren.length > 0 ? (
              <div className="text-right mt-6 mb-10">
                <Link
                  to="/"
                  className="hover:underline hover:text-blue-600 py-2 px-4">
                  Zobraz vše
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>

          <div data-testid="personsListWrapper">
            <h2 className="font-medium leading-tight text-xl mt-0 mb-4 text-blue-600">
              Terapeuti
            </h2>
            <div
              data-testid="personsListWrapper"
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {allPersons.length > 0 ? (
                allPersons.map((person) => {
                  return (
                    <div key={person.user_id}>
                      <Link
                        className="block bg-white px-4 py-4 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                        to={`/person/${person.user_id}`}
                        state={{
                          person,
                        }}>
                        <div className="flex mb-6">
                          <img
                            src={profileImage}
                            alt="Logo"
                            className="w-12 h-12 rounded-lg"
                          />
                          <h3 className="font-medium ml-4 text-lg">{`${person.user_first_name} ${person.user_last_name}`}</h3>
                        </div>
                        <div>
                          <p>Lorem ispum</p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>V seznamu nejsou žádne osoby</p>
              )}
            </div>

            {allPersons.length > 0 ? (
              <div className="text-right mt-6 mb-10">
                <Link
                  to="/"
                  className="hover:underline hover:text-blue-600 py-2 px-4">
                  Zobraz vše
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>

          <button
            className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
