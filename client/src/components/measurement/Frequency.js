import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Frequency = ({ data, setRemove, current }) => {
  const [frequency, setFrequency] = useState(0);
  const { id } = useParams();

  const handlePlusClick = () => {
    setFrequency(frequency + 1);
  };

  const handleMinusClick = () => {
    setFrequency(frequency - 1);
  };

  return (
    <div className="mt-10 mb-10">
      <h2>{data.target_title}</h2>
      <p>{data.target_description}</p>

      <Formik
        initialValues={{
          frequencyCount: frequency,
        }}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}recordmeasurement`,
              {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  token: localStorage.token,
                  child_id: id,
                  target_type: data.target_type,
                  target_id: data.target_id,
                },
                body: JSON.stringify(values),
              }
            );

            const parseRes = await response.json();
            if (parseRes.measrumentId) {
              toast.success('Target measurement saved succesfuly');
              setRemove(data.target_id);
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            toast.error('Jejda, načtení se nezdařilo!');
          }
        }}>
        {({ isSubmitting, isValid, dirty, setFieldValue }) => (
          <Form data-testid="addSkill">
            <div className="mt-4">
              <button
                className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  setFrequency(frequency - 1);
                  setFieldValue('frequencyCount', frequency - 1);
                }}>
                -
              </button>
              <button
                className="bg-blue-500 ml-2 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  setFrequency(frequency + 1);
                  setFieldValue('frequencyCount', frequency + 1);
                }}>
                +
              </button>
              <Field
                name="frequencyCount"
                id="frequencyCount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled
                value={frequency}
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
    </div>
  );
};
