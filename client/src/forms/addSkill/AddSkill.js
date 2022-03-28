import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

export const AddSkill = () => {
  return (
    <>
      <h1>Add Skill</h1>
      <Formik
        initialValues={{
          skillTitle: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.skillTitle) {
            errors.skillTitle = 'Skill title field is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {}}>
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
            <button
              className={
                (!dirty ? 'opacity-50 cursor-not-allowed ' : '') +
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              }
              type="submit"
              disabled={!dirty}>
              Add skill
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
