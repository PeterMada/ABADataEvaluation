import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const FrequencyTime = ({
  data,
  setRemove,
  current,
  fillForm = false,
  doNotShowDetails = false,
  elementId = false,
  isUpdate = false,
}) => {
  const { id } = useParams();
  const [formData, setformData] = useState([]);

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

          if (parseRes.question_result) {
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
    <div className="">
      {!doNotShowDetails ? (
        <div>
          <h3>{data.target_title}</h3>
          <p>{data.target_description}</p>
        </div>
      ) : (
        ''
      )}

      <Formik
        initialValues={{
          freq: 0,
          rate: 0,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          const measuremendType = doNotShowDetails ? 'baseline' : '';
          const measuremendId = data.measurement_id;
          try {
            let currentMethod = 'POST';
            let fetchUrl = 'recordmeasurement';
            if (isUpdate) {
              fetchUrl = 'updatemeasurement';
              currentMethod = 'PUT';
            }
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}${fetchUrl}`,
              {
                method: currentMethod,
                headers: {
                  'Content-type': 'application/json',
                  token: localStorage.token,
                  child_id: id,
                  target_type: data.target_type,
                  target_id: data.target_id,
                  measuremend_type: measuremendType,
                  measurement_id: measuremendId,
                },
                body: JSON.stringify(values),
              }
            );

            const parseRes = await response.json();
            if (parseRes.measrumentId) {
              toast.success('Target measurement saved succesfuly');
              if (doNotShowDetails) {
                setRemove(`${data.target_id}-${new Date().getTime()}`);
              } else {
                setRemove(data.target_id);
              }
            } else {
              toast.error(parseRes);
            }
          } catch (err) {
            console.log(err.message);
            toast.error('Jejda, načtení se nezdařilo!');
          }
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <div className="mt-4 flex items-center">
              <div className="mr-4">
                <Field
                  className="w-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  id="freq"
                  name="freq"
                  type="number"
                  min="1"
                />
                <ErrorMessage
                  className="text-red-500 text-xs mt-1 ml-1"
                  name="freq"
                  component="div"
                />
              </div>
              <p>za</p>
              <div className="flex ml-4">
                <div>
                  <Field
                    className="w-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                    id="rate"
                    name="rate"
                    type="number"
                    min="1"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="rate"
                    component="div"
                  />
                </div>
                <div className="ml-2">
                  <Field
                    className="w-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                    as="select"
                    name="timeType"
                    aria-label="Target type">
                    <option value="seconds">Sekund</option>
                    <option value="minutes">Minut</option>
                    <option value="hours">Hodin</option>
                  </Field>
                  <ErrorMessage
                    className="text-red-500 text-xs mt-1 ml-1"
                    name="timeType"
                    component="div"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ulož
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
