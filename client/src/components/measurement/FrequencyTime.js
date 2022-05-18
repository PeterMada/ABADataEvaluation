import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const FrequencyTime = () => {
  const [frequency, setFrequency] = useState(0);

  const handlePlusClick = () => {
    setFrequency(frequency + 1);
  };

  const handleMinusClick = () => {
    setFrequency(frequency - 1);
  };

  return (
    <>
      <h2>Freq time</h2>

      <Formik
        initialValues={{
          frequencyCount: 0,
          timeHours: 0,
          timeMinutes: 0,
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
              `${process.env.REACT_APP_API_URL}addSkill`,
              {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  token: localStorage.token,
                  child_id: id,
                },
                body: JSON.stringify(values),
              }
            );

            const parseRes = await response.json();
            if (parseRes.skillId) {
              toast.success('Skill added succesfully');
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
            <div className="mt-4">
              <button
                className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleMinusClick}>
                -
              </button>
              <button
                className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handlePlusClick}>
                +
              </button>
              <Field
                name="frequencyCount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled
                value={frequency}
              />

              <label htmlFor="timeHours">Hours</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timeHours"
                name="timeHours"
              />

              <label htmlFor="timeMinutes">Minutes</label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                step="1"
                id="timeMinutes"
                name="timeMinutes"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
