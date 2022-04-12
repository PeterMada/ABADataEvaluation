import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const PolarQuestion = ({
  data,
  setRemove,
  current,
  fillForm = false,
}) => {
  const { id } = useParams();
  const [formData, setformData] = useState([]);
  const [answerValue, setAnswerValue] = useState('');

  useEffect(() => {
    const fetchValuesForMeasurment = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}measurmentDetail`,
          {
            method: 'GET',
            headers: {
              token: localStorage.token,
              measurement_id: data.measurement_id,
              target_type: data.target_type,
            },
          }
        );
        const parseRes = await response.json();

        if (parseRes) {
          setformData(parseRes);
          setAnswerValue('No');
          if (parseRes.question_result) {
            setAnswerValue('Yes');
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (fillForm) {
      const targetResult = fetchValuesForMeasurment().catch(console.error);
    }
  }, []);

  return (
    <div className="mt-10 mb-10">
      <h2>{data.target_title}</h2>
      <p>{data.target_description}</p>

      <Formik
        initialValues={{
          answer: answerValue,
        }}
        enableReinitialize={true}
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
            toast.error('Oops, failed to fetch!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form data-testid="addSkill">
            <div className="mt-4">
              <div role="group">
                <label>
                  <Field type="radio" name="answer" value="No" />
                  No
                </label>
                <label>
                  <Field type="radio" name="answer" value="Yes" />
                  Yes
                </label>
              </div>
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
