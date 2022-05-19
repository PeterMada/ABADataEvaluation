import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSkill, setCurrentSkill] = useState([]);

  useEffect(() => {
    const fetchSkillDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}skillDetail`,
          {
            method: 'GET',
            headers: { token: localStorage.token, skill_id: id },
          }
        );
        const parseRes = await response.json();
        setCurrentSkill(parseRes.skillDetail);
      } catch (err) {
        console.error(err);
      }
    };

    const childResult = fetchSkillDetail().catch(console.error);
  }, []);

  return !currentSkill.skill_title ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>Add Skill</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          skillTitle: currentSkill.skill_title,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.skillTitle) {
            errors.skillTitle = 'Skill title field is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}editSkill`,
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
            if (parseRes.skillId) {
              toast.success('Dovednost byla úspěšně aktualizována');
              navigate(`/skill/${parseRes.skillId}`);
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Jejda, načtení se nezdařilo!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addSkill">
            <div className="mb-4">
              <label htmlFor="skillTitle">Skill title</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="skillTitle"
                name="skillTitle"
              />
              <ErrorMessage
                className="text-red-500 text-xs mt-1 ml-1"
                name="skillTitle"
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
                  Save
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
    </>
  );
};
